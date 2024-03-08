import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request, { params }: any) {
  const id = params.id;
  const donation = await prisma.donations.findUnique({
    where: {
      id: id,
    },
  });
  if (!donation)
    return new NextResponse("Donation information does not exist", {
      status: 400,
    });
  return new NextResponse(JSON.stringify(donation), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
