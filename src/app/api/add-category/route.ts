import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest)=> {
    try {
        const {name} = await req.json();
        const id  = await prisma.category.count() + 1        
        const newCategory = await prisma.category.create({
          data: {
            name,
            id
          },
        });
        return NextResponse.json({success:true,message:newCategory},{status:201})
      }catch(error){
        return NextResponse.json({error},{status:500})
    }
}