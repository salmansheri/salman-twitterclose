'use client';
import {useCallback} from 'react'; 
import { useRouter } from 'next/navigation'; 
import Image from 'next/image';


 

interface AvatarProps {
    userId: string; 
    isLarge?: boolean; 
    hasBorder?: boolean; 
    user?: any
    
   
}

const Avatar:React.FC<AvatarProps> = ({
    userId,
    isLarge,
    hasBorder,
    user
   
   
}) => {
    const router = useRouter(); 
   
    const onClick = useCallback((event:any) => {
        event.stopPropagation(); 

        const url = `/users/${userId}`; 

        router.push(url)
        



    }, [userId, router])
    
    return (
        <div 
         className={`${hasBorder ? "broder-4 " : "border-black"}
        ${isLarge ? "h-32": "h-12"}
        ${isLarge ? "w-32" : "w-12"}
        rounded-full 
        hover:opacity-90
        transition
        cursor-pointer
        relative

        
        `}>
            <Image 
                fill
                style={{objectFit: "cover", borderRadius: "100%"}}
                alt="avatar"
                onClick={onClick}
                src={user?.profileImage || '/images/placeholder.png'}

            />

           
            

         
           
        </div>
    )
}

export default Avatar; 