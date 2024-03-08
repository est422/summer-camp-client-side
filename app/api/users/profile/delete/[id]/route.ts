import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function DELETE(request: Request, { params }: any) {
  const id = params.id;
  // console.log("id", id);
  const userProfile = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  // console.log("user profile", userProfile);
  if (!userProfile)
    return new NextResponse("User does not exist", {
      status: 400,
    });
  return NextResponse.json("User has been successfully deleted", {
    status: 200,
  });
}
