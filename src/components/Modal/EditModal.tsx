'use client';
import { useCallback, useEffect, useState } from "react";
import useEditModal from "@/hooks/useEditModal";
import { User } from "@prisma/client";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from 'next/navigation'

 

interface EditModalProps {
    currentUser: User | null
}

const EditModal: React.FC<EditModalProps> = ({
    currentUser
}) => {

    
    const editModal = useEditModal(); 
    const router = useRouter(); 

    const [profileImage, setProfileImage] = useState(""); 
    const [coverImage, setCoverImage] = useState(""); 
    const [name, setName] = useState(""); 
    const [username, setUsername] = useState(""); 
    const [bio, setBio] = useState(""); 

    useEffect(() => {
        setProfileImage(currentUser?.profileImage as string)
        setCoverImage(currentUser?.coverImage as string)
        setName(currentUser?.name as string)
        setUsername(currentUser?.username as string)
        setBio(currentUser?.bio as string)
        

    }, [
        currentUser?.name, 
        currentUser?.username,
        currentUser?.bio,
        currentUser?.profileImage,
        currentUser?.coverImage
    
    ]); 


  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit = useCallback(async () => {
    try {
        setIsLoading(true); 

        await axios.patch("/api/edit", {
            name, 
            username,
            bio,
            profileImage,
            coverImage,
        }); 

        router.refresh();
        
        toast.success("Updated"); 

        editModal.onClose(); 


    } catch(error) {
        toast.error("something went wrong")
        console.log(error)
 
    } finally {
        setIsLoading(false); 
    }

  }, [])


    return(
        <div>

        </div>
    )
}

export default EditModal