import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function DELETE(request: Request, { params }: any) {
  const id = params.id;
  // console.log("id", id);
  const applicantInfo = await prisma.applicantsInfo.delete({
    where: {
      id: id,
    },
  });
  // console.log("applicant info", applicantInfo);
  if (!applicantInfo)
    return new NextResponse("Applicant does not exist", {
      status: 400,
    });
  return NextResponse.json("Applicant has been successfully deleted", {
    status: 200,
  });
}
