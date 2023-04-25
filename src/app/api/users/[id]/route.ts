import prisma from "@/libs/prismaDB";
import { NextResponse } from "next/server";

interface IParams {
  id?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    const { id } = params;

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    const followerCount = await prisma.user.count({
        where: {
            followingIds: {
                has: id,
            }
        }
    })

    return NextResponse.json({...user, followerCount}, {
        status: 200,
    })

   
  } catch (err) {
    return NextResponse.error();
  }
}
