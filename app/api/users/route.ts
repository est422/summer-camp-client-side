import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  const users = await prisma.user.findMany({
    where: {
      role: "USER",
    },
    include: {
      addressInfo: {
        select: {
          phone: true,
          address: true,
          city: true,
        },
      },
    },
  });
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // console.log(data);
    const checkUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (checkUser) {
      // console.log("email exists");
      return new NextResponse("Unable to create user email already exists", {
        status: 400,
      });
      // return null;
    } else {
      const passwordHash = bcrypt.hashSync(data.password, 10);
      const user = await prisma.user.create({
        data: {
          imageName: data?.imageName,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          password: passwordHash,
          relationshiptocamper: data?.relationshiptocamper,
          role: data?.role,
          addressInfo: {
            create: {
              phone: data.phone,
              address: data.address,
              city: data.city,
            },
          },
        },
      });
      // console.log(user);
      return new NextResponse("Registratoin successfull!", {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error: any) {
    console.log("error", error);
    return new NextResponse(error.message, { status: 500 });
  }
}
