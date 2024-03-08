import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  const users = await prisma.camperInfo.findMany();
  return NextResponse.json(users);
}
