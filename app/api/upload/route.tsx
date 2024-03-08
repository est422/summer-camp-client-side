// import fs from "fs";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const formData = await req.formData();
//   const formDataEntryValues = Array.from(formData.values());
//   for (const formDataEntryValue of formDataEntryValues) {
//     if (
//       typeof formDataEntryValue === "object" &&
//       "arrayBuffer" in formDataEntryValue
//     ) {
//       const file = formDataEntryValue as unknown as Blob;
//       const buffer = Buffer.from(await file.arrayBuffer());
//       fs.writeFileSync(`public/${file.name}`, buffer);
//     }
//   }
//   return NextResponse.json({ success: true });
// }

import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
export async function POST(request: NextRequest) {
  console.log("reqData", request);
  const data = await request.formData();
  console.log("data", data);
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join("./", "temp", file.name);
  await writeFile(path, buffer);
  console.log(`open ${path} to see the uploaded file`);

  return NextResponse.json({ success: true });
}
