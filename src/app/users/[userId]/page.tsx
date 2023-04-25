import Header from "@/components/Header";
import { getUser } from "@/libs/users";
import UserHero from "./UserHero";
import { User } from "@prisma/client";
import UserBio from "./UserBio";
import getCurrentUser from "@/libs/serverAuth";


interface IParams {
    userId?: string; 
}

const UserPage = async ({params}: {params: IParams}) => {
   const { userId } = params;
   // @ts-ignore
   const user: User = await getUser(userId) 

   const currentUser = await getCurrentUser(); 
    return(
        <>
           {/* @ts-ignore  */}
            <Header label={user?.name} showBackArrow />
            <UserHero
                userId={userId as string}
                user={user}
            />
            <UserBio userId={userId as string} user={user} currentUser={currentUser} />
            
            
        </>
    )
}

export default UserPage;