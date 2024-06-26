import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";


export const GET = async (req: NextRequest) => {
    try {
      // const page = req.nextUrl.searchParams.get("page");
        const seller = await prisma.user.findMany({
          where: {
            role: {
              name: "seller",
            },
          },
          include: {
            // Include the phone number from the related profile
            store:{
              select:{
                storeName:true,
                followers:true,
                productsCount:true,
              }
            },
            phoneNumbers: {
              where: {
                isPrimary: true,
              },
            },
          },
          // skip: page ? (parseInt(page) -1) * 10 : 0,
        });
        const filteredStores = seller.map((user) => ({
          id: user.id,
          storeName: user.store?.storeName,
          email: user.email,
          phoneNumbers: user.phoneNumbers.length > 0 ? user.phoneNumbers[0]?.phoneNumber : "غير متوفر",
          followers: user.store?.followers,
          productsCount: user.store?.productsCount,
        }));
        console.log("users: ",filteredStores);
        return NextResponse.json({stores:filteredStores}, {status: 200});
      } catch(error) {
        return NextResponse.json({error: "Internal server error"}, {status: 500});
      }
}
// export const POST = async () => {
//     return NextResponse.json({message: " method"});
// }