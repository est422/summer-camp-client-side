// import { prisma } from "@/lib/prisma";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import fs from "fs";

export async function GET(request: Request) {
  const applicants = await prisma.applicantsInfo.findMany();
  return NextResponse.json(applicants);
}

export async function POST(request: NextRequest) {
  // console.log("post req", request);

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

    const applicantInfo = await prisma.applicantsInfo.create({
      data: {
        imageName: data?.get("imageName") as string,
        firstName: data?.get("fname") as string,
        lastName: data?.get("lname") as string,
        age: data.get("age") as string,
        phone: data.get("phone") as string,
        gender: data?.get("gender") as string,
        address: data.get("address") as string,
        city: data.get("city") as string,
        major: data.get("major") as string,
        skillsandabilities: data.get("skillsandabilities") as string,
        references: data.get("references") as string,
        experiances: data.get("experiances") as string,
        cv: data.get("fileName") as string,
        appliedPosition: data.get("appliedPosition") as string,
      },
    });

    return new NextResponse(JSON.stringify(applicantInfo), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.log("error", error);
    if (error) {
      return new NextResponse("Unable to create camper", {
        status: 400,
      });
    }
    console.log("error", error);
    return new NextResponse(error.message, { status: 500 });
  }
}
