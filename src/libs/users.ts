import { User } from "@prisma/client";
import prisma from "./prismaDB";

export async function getUsers() {
  try {
    const users: Array<User> = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!users) {
      return null;
    }

    return users;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function getUser(id: any) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    const followerCount = await prisma.user.count({
      where: {
        followingIds: {
          has: id,
        },
      },
    });

    return { ...user, followerCount };
  } catch (err) {
    throw new Error(err as any);
  }
}
