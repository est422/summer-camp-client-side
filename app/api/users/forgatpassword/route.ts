import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";
import fs from "fs";

export async function PUT(request: Request, { params }: any) {
  //   const id = params.id;
  // const data = await request.json();
  try {
    // const data = await request.json();
    const data = await request.json();

    const passwordHash = bcrypt.hashSync(data.password, 10);

    // console.log(data);
    const checkUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!checkUser) {
      return new NextResponse("Unable to find user with the email provided", {
        status: 400,
      });
    }
    // console.log("user", checkUser);
    const userInfo = checkUser;

    const updatedUserInfo = await prisma.user.update({
      where: {
        id: userInfo.id,
      },
      data: {
        password: passwordHash,
      },
    });

    return new NextResponse("update successfull", {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.log("error", error);
    return new NextResponse(error.message, { status: 500 });
  }
}
