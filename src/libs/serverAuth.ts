import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "./prismaDB";

async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null; 
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session?.user?.email,
    },
  });

  if (!currentUser) {
    return null; 
  }

  return currentUser;
}

export default getCurrentUser;
