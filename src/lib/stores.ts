import { prisma } from "@/lib/db";

export const getStores = async () => {
    try{

      const users = await prisma.store.findMany({
        select: {
          id: true,
          storeName: true,
          productsCount: true,
          followers: true,
          user: {
            select: {
              id: true,
              email: true,
              phoneNumbers: {
                where: {
                  isPrimary: true,
                },
              },
            },
          },
        },
      })

      const usersData = users.map((user) => {
        return {
          id: user.id,
          storeName: user.storeName,
          email: user.user.email,
          phoneNumbers: user.user.phoneNumbers[0] || "غير متوفر",
          followers: user.followers,
        productsCount: user.productsCount,
        };
      })
      console.log(usersData)
    //   const data : any = await usersData.json();
    return usersData;
  }catch{
    return null;
  }
}