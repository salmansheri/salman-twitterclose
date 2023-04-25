import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
// import currentUser from '@/libs/serverAuth'
import { User } from '@prisma/client'
import getCurrentUser from '@/libs/serverAuth'
import { getUsers } from '@/libs/users'
import { getUser } from '@/libs/users'

const inter = Inter({ subsets: ['latin'] })

export default async  function Home() {




  
  
  
  return (
    <>
    <Header label="Home" />
    <div className="text-white">
     

    
    </div>
 
    </>  
    )
}
