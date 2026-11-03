import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Readable } from "stream";
import { drive } from "../../../lib/drive";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files");
    const githubUrl = formData.get("githubUrl");
    const userId = formData.get("userId");

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const parentFolderId = process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID;

    // 1. Create a specific Drive folder for this submission
    const folderRes = await drive.files.create({
      resource: {
        name: `Project_${userId}`,
        mimeType: "application/vnd.google-apps.folder",
        parents: [parentFolderId],
      },
      fields: "id, webViewLink",
    });

    const folderId = folderRes.data.id;
    const folderUrl = folderRes.data.webViewLink;

    // 2. Upload each file into the newly created folder
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const stream = new Readable();
      stream.push(buffer);
      stream.push(null);

      await drive.files.create({
        requestBody: {
          name: file.name,
          parents: [folderId],
        },
        media: {
          mimeType: file.type,
          body: stream,
        },
      });
    }

    // 3. Save the submission to Supabase (using Anon key or Service Role)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );

    const { error: dbError } = await supabase.from("submissions").insert([
      {
        profile_id: userId,
        github_url: githubUrl,
        drive_folder_url: folderUrl,
      },
    ]);

    if (dbError) throw dbError;

    return NextResponse.json({ success: true, folderUrl });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 },
    );
  }
}
