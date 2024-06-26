import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        let complaints = await prisma.complaint.findMany();
        const newComplaints = await Promise.all(complaints.map(async (complaint) => {
            let data = await prisma.complaintType.findUnique({
                where: {
                    id: complaint.type,
                },
                select: {
                    name: true,
                },
            });
            let user = await prisma.user.findUnique({
                where: {
                    id: complaint.userId,
                },
                select: {
                    email: true,
                },
            });
            return {
                id: complaint.id,
                email: user?.email,
                type: data?.name,
                userType: complaint?.userTypeId === 2 ? "تاجر" : "عميل",
                message: complaint.message,
                fixed: complaint.fixed === true ? "تم إصلاحه" : "لم تحل",
            };
        }));
       console.log(newComplaints)
        return NextResponse.json({ success: true, complaints:newComplaints }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
};
