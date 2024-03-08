import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import fs from "fs";

export async function PUT(request: Request, { params }: any) {
  const id = params.id;
  // const data = await request.json();
  try {
    // const data = await request.json();
    const data = await request.formData();

    //Upload Image
    // const formDataEntryValues = Array.from(data.values());
    // for (const formDataEntryValue of formDataEntryValues) {
    //   if (
    //     typeof formDataEntryValue === "object" &&
    //     "arrayBuffer" in formDataEntryValue
    //   ) {
    //     const file = formDataEntryValue as unknown as Blob;
    //     const buffer = Buffer.from(await file.arrayBuffer());
    //     fs.writeFileSync(`public/applicantscv/${file.name}`, buffer);
    //   }
    // }

    const applicantInfo = await prisma.applicantsInfo.update({
      where: {
        id: id,
      },
      data: {
        // imageName: data?.get("imageName") as string,
        // firstName: data?.get("fname") as string,
        // lastName: data?.get("lname") as string,
        // phone: data.get("phone") as string,
        // age: data.get("age") as string,
        // gender: data?.get("gender") as string,
        // address: data.get("address") as string,
        // city: data.get("city") as string,
        // major: data.get("major") as string,
        // skillsandabilities: data.get("skillsandabilities") as string,
        // references: data.get("references") as string,
        // experiances: data.get("experiances") as string,
        // // cv: data.get("cv") as string,
        // appliedPosition: data.get("appliedPosition") as string,
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
      return new NextResponse("Unable to update applicant info", {
        status: 400,
      });
    }
    console.log("error", error);
    return new NextResponse(error.message, { status: 500 });
  }
}
