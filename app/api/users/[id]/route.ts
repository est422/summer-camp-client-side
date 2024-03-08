import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {
  console.log("req.params.userId", params.id);
  const id = params.id;
  // console.log("id", id);
  const userProfile = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      addressInfo: {
        select: {
          phone: true,
          address: true,
          city: true,
        },
      },
      camperInfo: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  // console.log("user profile", userProfile);
  if (!userProfile) return NextResponse.error();
  return NextResponse.json(userProfile);
}

export async function PUT(request: Request, { params }: any) {
  console.log("put req", request.body);
  const id = params.id;

  try {
    const data = await request.json();
    console.log("put data", data);

    const user = await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        // data
      },
    });

    return new NextResponse(JSON.stringify(user), {
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
