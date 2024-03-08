import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";
import fs from "fs";

export async function PUT(request: Request, { params }: any) {
  const id = params.id;
  // const data = await request.json();
  try {
    // const data = await request.json();
    const data = await request.formData();

    //Upload Image
    const formDataEntryValues = Array.from(data.values());
    for (const formDataEntryValue of formDataEntryValues) {
      if (
        typeof formDataEntryValue === "object" &&
        "arrayBuffer" in formDataEntryValue
      ) {
        const file = formDataEntryValue as unknown as Blob;
        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(`public/applicantscv/${file.name}`, buffer);
      }
    }

    const volunteersInfo = await prisma.volunteersInfo.update({
      where: {
        id: id,
      },
      data: {
        status: data.get("status") as string,
      },
    });

    return new NextResponse("update successfull", {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.log("error", error);
    if (error) {
      return new NextResponse("Unable to update volunteers info", {
        status: 400,
      });
    }
    console.log("error", error);
    return new NextResponse(error.message, { status: 500 });
  }
}
