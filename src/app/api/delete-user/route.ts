import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const {userId} =await req.json();
    try{
        const items = await prisma.orderItem.deleteMany({ 
            where:{
                order:{
                    cart:{
                        userId: parseInt(userId)
                    }}
            }
        })
        const order = await prisma.order.deleteMany({ 
            where:{

                userId: parseInt(userId)
            }
        })
        const cartItem = await prisma.cartItem.deleteMany({ 
            where:{
                userId: parseInt(userId)
            }
        })
        const cart = await prisma.cart.deleteMany({ 
            where:{
                userId: parseInt(userId)
            }
        })
        const review = await prisma.reviews.deleteMany({ 
            where:{
                userId: parseInt(userId)
            }
        })
        const fav = await prisma.favoriteStore.deleteMany({ 
            where:{
                userId: parseInt(userId)
            }
        })
        const address = await prisma.address.deleteMany({
            where:{
                id: parseInt(userId)
            }
        })
        const user = await prisma.user.deleteMany({ 
            where:{
                id: parseInt(userId)
            }
        })

        return NextResponse.json({success:true, message:`user deleted ${userId}`},{status:200})
    }catch(error){
        return NextResponse.json({error},{status:500})
    }
}