import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismaDB";

export async function GET(req: Request) {
    return NextResponse.json({message: "This is Register route"}); 
}


export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, username, name, password } = body;

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user, {
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}
