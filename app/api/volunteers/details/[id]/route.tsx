import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request, { params }: any) {
  const id = params.id;
  const volunteersInfo = await prisma.volunteersInfo.findUnique({
    where: {
      id: id,
    },
  });
  if (!volunteersInfo)
    return new NextResponse("Volunteers information does not exist", {
      status: 400,
    });
  return new NextResponse(JSON.stringify(volunteersInfo), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
