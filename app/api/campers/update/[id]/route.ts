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
    // console.log("data", data);

    //Upload Image
    // const formDataEntryValues = Array.from(data.values());
    // for (const formDataEntryValue of formDataEntryValues) {
    //   if (
    //     typeof formDataEntryValue === "object" &&
    //     "arrayBuffer" in formDataEntryValue
    //   ) {
    //     const file = formDataEntryValue as unknown as Blob;
    //     const buffer = Buffer.from(await file.arrayBuffer());
    //     fs.writeFileSync(`public/${file.name}`, buffer);
    //   }
    // }

    // const dob = new Date(data?.get("dateofbirth"));

    const camperInfo = await prisma.camperInfo.update({
      where: {
        id: id,
      },
      data: {
        imageName: data?.get("imageName") as string,
        firstName: data?.get("fname") as string,
        lastName: data?.get("lname") as string,

        dateofbirth: new Date(data?.get("dateofbirth") as unknown as Date),

        camperMedicalInfo: {
          update: {
            where: {
              id: data?.get("camperMedicalInfoId") as string,
            },
            data: {
              alergies: data?.get("alergies") as string,
              medicalCondition: data?.get("medicalCondition") as string,
              dietaryRestriction: data?.get("dietaryRestriction") as string,
              shouldAvoid: data?.get("shouldAvoid") as string,
              accommodationRequirments: data?.get(
                "accommodationRequirments"
              ) as string,
            },
          },
        },
      },
    });

    return new NextResponse("update successfull", {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.log("error", error);
    if (error) {
      return new NextResponse("Unable to update camper", {
        status: 400,
      });
    }
    console.log("error", error);
    return new NextResponse(error.message, { status: 500 });
  }
}
