import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { NextResponse } from "next/server";

export async function GET() {
    const wishes = await getWishes();
    return NextResponse.json(wishes)
}

const getWishes = async () => {
    try {
        const rs = await prisma.wish.findMany({
            orderBy: {
                createdAt: "desc"
            },
        });
        return rs.map(e => ({
            ...e,
            updatedAt: e.updatedAt ? dayjs(e.updatedAt).format("DD/MM HH:mm") : dayjs(e.createdAt).format("DD/MM HH:mm")
        }))
    } catch {
        return [];

    }
}