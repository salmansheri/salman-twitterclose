'use client'

import Button from "@/components/Button";
import useEditModal from "@/hooks/useEditModal";
import { User } from "@prisma/client";
import { format, } from 'date-fns'; 
import { useMemo } from 'react'
import { BiCalendar } from "react-icons/bi";


interface UserBioProps {
    userId: string; 
    user: User | null; 
    currentUser: User | null
}



const UserBio:React.FC<UserBioProps>  = ({
    user,
    userId,
    currentUser,
}) => {

    const editModal = useEditModal(); 

   
    const createAt = useMemo(()=> {
        if(!user?.createdAt) {
            return null; 
        }

        return format(new Date(user.createdAt), 'MMMM yyyy')




    }, [user?.createdAt]); 
 


    return (
        <div className="border-b-[1px] border-neutral-800 pb-4">
            <div className="flex justify-end p-2">
                {currentUser?.id === userId ? (
                    <Button secondary label="Edit" onClick={editModal.onOpen} />

                ) : (
                    <Button 
                        onClick={() => {}}
                        label="Follow"
                        secondary
                    />

                )}

            </div>
            <div className="mt-8 px-4">
                <div className="flex flex-col">
                    <p className="text-white text-2xl font-semibold">
                        {user?.name}

                    </p>
                    <p className="text-md text-neutral-500">
                        @{user?.username}

                    </p>

                </div>
                <div className="flex flex-col mt-4">
                    <p className="text-white">
                        {user?.bio}

                    </p>
                    <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
                        <BiCalendar 
                            size={24}
                        />
                        <p >
                            Joined {createAt} hello

                        </p>


                    </div>

                </div>
                <div className="flex flex-row items-center mt-4 gap-6">
                    <div className="flex flex-row items-center gap-1">
                        <p className="text-white">
                            {user?.followingIds?.length}

                        </p>
                        <p className="text-neutral-500">
                            following 

                        </p>


                    </div>
                    <div className="flex flex-row gap-1">
                        <p className="text-white">
                            {/* @ts-ignore */}
                            {user?.followerCount || 0}
                        </p>
                        <p className="text-neutral-500">
                            Followers

                        </p>

                    </div>

                </div>

            </div>
            
        </div>
    )
}

export default UserBio;