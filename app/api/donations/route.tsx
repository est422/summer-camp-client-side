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
        fs.writeFileSync(`public/donationsreceipt/${file.name}`, buffer);
      }
    }

    const donations = await prisma.donations.create({
      data: {
        firstName: data?.get("fname") as string,
        lastName: data?.get("lname") as string,
        phone: data.get("phone") as string,
        address: data.get("address") as string,
        city: data.get("city") as string,
        donationType: data.get("donationType") as string,
        receipt: data.get("fileName") as string,
        amount: data.get("amount") as string,
        description: data.get("description") as string,
      },
    });

    return new NextResponse(JSON.stringify(donations), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.log("error", error);
    if (error) {
      return new NextResponse("Unable to create donation", {
        status: 400,
      });
    }
    console.log("error", error);
    return new NextResponse(error.message, { status: 500 });
  }
}
