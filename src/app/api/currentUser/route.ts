import { NextResponse } from "next/server";
import getCurrentUser from "@/libs/serverAuth";

export async function GET(req: Request) {
   
        const currentUser = await getCurrentUser(); 

        if(!currentUser) {
            return null
        }

        return NextResponse.json(currentUser, {
            status: 200,
        })

  
}