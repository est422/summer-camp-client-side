import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function DELETE(request: Request, { params }: any) {
  const id = params.id;
  // console.log("id", id);
  const volunteersInfo = await prisma.volunteersInfo.delete({
    where: {
      id: id,
    },
  });
  // console.log("applicant info", volunteersInfo);
  if (!volunteersInfo)
    return new NextResponse("Volunteer does not exist", {
      status: 400,
    });
  return NextResponse.json("Volunteer has been successfully deleted", {
    status: 200,
  });
}
