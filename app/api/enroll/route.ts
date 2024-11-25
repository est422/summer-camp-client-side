// import { prisma } from "@/lib/prisma";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import fs from "fs";

export async function GET(request: Request) {
  const users = await prisma.camperInfo.findMany();
  return NextResponse.json(users);
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
        fs.writeFileSync(`public/${file.name}`, buffer);
      }
    }
    // const data = await request.json();

    // console.log(`form data: ${fName} ${dateofbirth}`);
    const dob = new Date(data?.get("dob") as unknown as Date);

    const camperInfo = await prisma.camperInfo.create({
      data: {
        imageName: data?.get("imageName") as string,
        firstName: data?.get("fname") as string,
        lastName: data?.get("lname") as string,
        dateofbirth: dob,
        gender: data?.get("gender") as string,
        // userId: data?.userId,
        user: {
          connect: {
            id: data?.get("userId") as string,
          },
        },
        camperMedicalInfo: {
          create: {
            alergies: data?.get("alergies") as string,
            medicalCondition: data?.get("medicalCondition") as string,
            dietaryRestriction: data?.get("dietaryRestriction") as string,
            shouldAvoid: data?.get("shouldAvoid") as string,
            accommodationRequirments: data?.get(
              "accommodationRequirments"
            ) as string,
            // alergies: data?.alergies,
            // medicalCondition: data?.medicalCondition,
            // dietaryRestriction: data?.dietaryRestriction,
            // shouldAvoid: data?.shouldAvoid,
            // accommodationRequirments: data?.accommodationRequirments,
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(camperInfo), {
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
