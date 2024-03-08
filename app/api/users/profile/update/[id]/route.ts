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
        fs.writeFileSync(`public/${file.name}`, buffer);
      }
    }

    const userInfo = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        imageName: data?.get("imageName") as string,
        firstName: data?.get("fname") as string,
        lastName: data?.get("lname") as string,

        relationshiptocamper: data?.get("relationshiptocamper") as string,

        addressInfo: {
          update: {
            phone: data?.get("phone") as string,
            address: data?.get("address") as string,
            city: data?.get("city") as string,
          },
        },

        receipt: data?.get("fileName") as string,
      },
    });

    return new NextResponse("update successfull", {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.log("error", error);
    if (error) {
      return new NextResponse("Unable to update user", {
        status: 400,
      });
    }
    console.log("error", error);
    return new NextResponse(error.message, { status: 500 });
  }
}
