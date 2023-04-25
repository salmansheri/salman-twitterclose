'use client';
import { IconType } from "react-icons";
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'; 
import { User } from "@prisma/client";
import useLoginModal from "@/hooks/useLoginModal";
import axios from "axios";

 


interface SidebarItemProps {
    label: string; 
    href?:string; 
    icon: IconType; 
    onClick?: () => void; 
    
}


const SidebarItem: React.FC<SidebarItemProps> = ({
    label,
    href,
    icon: Icon,
    onClick, 
   
}) => {
    const router = useRouter(); 
    const loginModal = useLoginModal(); 
   
    const [currentUser, setCurrentUser] = useState(null); 

    useEffect( () => {
        const fetchUser = async () => {
            try {
                const response: any = await axios.get("/api/currentUser"); 
          
                setCurrentUser(response.data) 
                if(currentUser === null) {
                    return null; 
                }

            } catch(err) {
                console.log(err)

            }
           

                        
        }

        fetchUser(); 



        
        
    }, [currentUser])

   

  

    const handleClick =useCallback(() => {
        if(onClick) {
            return onClick()
        }

        if(!currentUser) {
          loginModal.onOpen()
           
        
        } else if(href) {
            router.push(href)
        }
       

    }, [onClick, href, router, loginModal, currentUser])

    
    return(
        <div onClick={handleClick} className="flex flex-row items-center ">
            <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
                <Icon size={28} color="white" />


            </div>
            <div className="hidden relative lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer ">
                <Icon size={24} color="white" />

                <p className="hidden lg:block text-white text-xl">
                    
                    {label}
                </p>
                

            </div>

        </div>
    )
}

export default SidebarItem; 