import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request, { params }: any) {
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
          id: true,
          imageName: true,
          firstName: true,
          lastName: true,
          dateofbirth: true,
          gender: true,
          camperMedicalInfo: {
            select: {
              alergies: true,
              medicalCondition: true,
              dietaryRestriction: true,
              shouldAvoid: true,
              accommodationRequirments: true,
            },
          },
        },
      },
    },
  });
  // console.log("user profile", userProfile);
  if (!userProfile)
    return new NextResponse("User does not exist", {
      status: 400,
    });
  return new NextResponse(JSON.stringify(userProfile), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
