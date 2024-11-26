// import { prisma } from "@/lib/prisma";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import fs from "fs";

export async function GET(request: Request) {
  const donations = await prisma.donations.findMany();
  return NextResponse.json(donations);
}

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
    //     fs.writeFileSync(`public/donationsreceipt/${file.name}`, buffer);
    //   }
    // }

    const donations = await prisma.donations.update({
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
      return new NextResponse("Unable to update donations info", {
        status: 400,
      });
    }
    console.log("error", error);
    return new NextResponse(error.message, { status: 500 });
  }
}
