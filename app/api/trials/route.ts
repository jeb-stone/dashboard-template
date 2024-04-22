import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    id: "TEST_XXXX_1234"
  })
}


export async function POST(request: Request) {
  const data = await request.json()
  return NextResponse.json({
    data,
  })
}