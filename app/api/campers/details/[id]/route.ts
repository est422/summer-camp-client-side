import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request, { params }: any) {
  const id = params.id;
  // console.log("id", id);
  const camperProfile = await prisma.camperInfo.findUnique({
    where: {
      id: id,
    },
    include: {
      camperMedicalInfo: {
        where: {
          camperId: id,
        },
        select: {
          id: true,
          alergies: true,
          medicalCondition: true,
          dietaryRestriction: true,
          shouldAvoid: true,
          accommodationRequirments: true,
        },
      },
    },
  });
  // console.log("user profile", camperProfile);
  if (!camperProfile)
    return new NextResponse("Camper does not exist", {
      status: 400,
    });
  // console.log("retrieved camper info", camperProfile);

  return new NextResponse(JSON.stringify(camperProfile), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
