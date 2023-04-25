'use client'; 

import Image from "next/image";
import Avatar from "@/components/Avatar";
import { User } from "@prisma/client";

interface UserHeroProps {
    userId: string; 
    user: User | null
}

const UserHero: React.FC<UserHeroProps> = ({
    userId,
    user
}) => {
    return(
        <div className="bg-neutral-700 h-44 relative">
            {user?.coverImage && (
                <Image 
                    src={user.coverImage}
                    alt="Cover Image"
                    fill
                    style={{objectFit: "cover"}}
                />
            )}
            <div className="absolute -bottom-16 left-4">
                <Avatar 
                    userId={userId}
                    isLarge
                    hasBorder
                />


            </div>
           
        </div>
    )
}

export default UserHero; 