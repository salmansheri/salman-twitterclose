'use client';
import useLoginModal from "@/hooks/useLoginModal";
;
import { useCallback, useState } from "react";
import Input from "../input/Input";
import Modal from "./Modal";
import useRegisterModal from "@/hooks/useRegisterModal";

 

const RegisterModal = () => {
    const loginModal = useLoginModal(); 
    const registerModal = useRegisterModal(); 
    const [email, setEmail] = useState<string>(""); 
    const [password, setPassword] = useState<string>(""); 
    const [username, setUsername] = useState<string>("")
    const [name, setName] = useState<string>(""); 
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true)

            // TODO ADD LOGIN

            registerModal.onClose(); 

        } catch(err) {
            console.log(err)

        } finally {
            setIsLoading(false)
        }

    }, [registerModal]); 

    const onToggle = useCallback(() => {
        if(isLoading) {
            return; 
        }

        registerModal.onClose(); 
        loginModal.onOpen(); 

    }, [isLoading,registerModal, loginModal])

    const bodyContent = (
        <div className="flex flex-col gap-4 ">
            <Input 
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}

            />
            <Input 
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}

            />
            <Input 
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}

            />
            <Input 
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}

            />

        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p className="">Already have an Account?
            <span onClick={onToggle} className="text-white cursor-pointer hover:underline">
            
                Sign in

            </span>
            </p>

        </div>
    )



    return(
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen} 
            onClose={registerModal.onClose}
            title="Create an Account"
            actionLabel="Register "
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
            

        />
    )
}

export default RegisterModal; 