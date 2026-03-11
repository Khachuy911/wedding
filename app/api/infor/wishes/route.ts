import { createClient } from "@supabase/supabase-js";
import dayjs from "dayjs";
import { NextResponse } from "next/server";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
    const wishes = await getWishes();
    return NextResponse.json(wishes)
}

const getWishes = async () => {
    try {
        const { data, error } = await supabase
            .from('Wish')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching wishes:', error);
            return [];
        }

        return data?.map(e => ({
            ...e,
            updatedAt: e.updatedAt ? dayjs(e.updatedAt).format("DD/MM HH:mm") : dayjs(e.createdAt).format("DD/MM HH:mm")
        })) || [];
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}