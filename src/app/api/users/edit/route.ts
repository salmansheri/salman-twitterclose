import { NextResponse } from "next/server";
import getCurrentUser from "@/libs/serverAuth";
import prisma from "@/libs/prismaDB";
import { User } from "@prisma/client";


export async function GET(req: Request) {
    return new Response("this is user edit route")
}

export async function PATCH(
    request: Request
) {
    try {

        const currentUser: User | null = await getCurrentUser(); 

        const body = await request.json(); 

        const {
            name,
            username, 
            bio,
            profileImage, 
            coverImage
        } = body; 

        if(!name || !username) {
            throw new Error("Missing Fields")
        }

        const user = await prisma.user.update({
            where: {
                id: currentUser?.id
            }, 
            data: {
                name,
                username,
                bio,
                profileImage,
                coverImage,

            }
        })

        return NextResponse.json(user, {
            status: 200,
        })

    } catch(error) {
        console.log(error as string)
        return NextResponse.error()
    }

}