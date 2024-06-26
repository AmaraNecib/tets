import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";


export const GET = async (req: NextRequest) => {
    try {
      // const page = req.nextUrl.searchParams.get("page");
        const users = await prisma.user.findMany({
          where: {
            role: {
              name: "admin",
            },
          },
          include: {
            // Include the phone number from the related profile
            phoneNumbers: {
              where: {
                isPrimary: true,
              },
            },
            // Include the count of orders related to each user
            orders: true
          },
          // skip: page ? (parseInt(page) -1) * 10 : 0,
        });
        const filteredUsers = users.map((user) => ({
          id: user.id,
          name: user.firstName + " " + user.lastName,
          email: user.email,
          phoneNumbers: user.phoneNumbers.length > 0 ? user.phoneNumbers[0].phoneNumber : "غير متوفر",
          orders: user.orders.length
        }));
        console.log("users: ",filteredUsers);
        return NextResponse.json({users:filteredUsers}, {status: 200});
      } catch(error) {
        return NextResponse.json({error: "Internal server error"}, {status: 500});
      }
}
// export const POST = async () => {
//     return NextResponse.json({message: " method"});
// }