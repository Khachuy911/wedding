import { dataLocal } from "@/lib/server-utils";
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(dataLocal)
}
