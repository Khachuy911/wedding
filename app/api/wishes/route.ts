import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  try {
    const { data: wishes, error } = await supabase
      .from('Wish')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching wishes:', error)
      return NextResponse.json(
        {
          error: "Không thể tải danh sách lời chúc.",
        },
        { status: 500 }
      )
    }

    return NextResponse.json({ wishes }, { status: 200 })
  } catch {
    return NextResponse.json(
      {
        error: "Không thể tải danh sách lời chúc.",
      },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, desc } = body

    if (!name || !desc) {
      return NextResponse.json(
        { error: "Thiếu các trường bắt buộc (name, desc)!" },
        { status: 400 }
      )
    }

    const { data: newWish, error } = await supabase
      .from('Wish')
      .insert({
        name,
        desc,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating wish:', error)
      return NextResponse.json(
        {
          error: "Không thể tạo lời chúc!",
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        message: "Tạo lời chúc thành công!",
        wish: newWish,
      },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      {
        error: "Không thể tạo lời chúc!",
      },
      { status: 500 }
    )
  }
}
