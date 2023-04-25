'use client';
import useLoginModal from "@/hooks/useLoginModal";
;
import { useCallback, useState } from "react";
import Input from "../input/Input";
import Modal from "./Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from 'next-auth/react'; 
import { toast } from "react-hot-toast";

 

const LoginModal = () => {
    const loginModal = useLoginModal(); 
    const registerModal = useRegisterModal(); 
    const [email, setEmail] = useState<string>(""); 
    const [password, setPassword] = useState<string>(""); 
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onToggle = useCallback(() => {
        if(isLoading) {
            return; 
        }

        loginModal.onClose(); 
        registerModal.onOpen(); 

    }, [isLoading, loginModal, registerModal])

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true)

            await signIn('credentials', {
                email, 
                password
            })
            toast.success("Logged in")



            

            loginModal.onClose(); 

        } catch(err) {
            console.log(err)

        } finally {
            setIsLoading(false)
        }

    }, [loginModal, email, password]); 

    const bodyContent = (
        <div className="flex flex-col gap-4 ">
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
            <p>
                New to Twitter? 
                <span className="text-white cursor-pointer hover:underline" onClick={onToggle}>
                    Create an Account
                </span>
            </p>

        </div>
    )



    return(
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen} 
            onClose={loginModal.onClose}
            title="Login"
            actionLabel="Sign in "
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
            

        />
    )
}

export default LoginModal; 