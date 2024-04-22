import { NextResponse } from "next/server"

import {postRecordToSupabase, postRecordToAirtable} from '@/app/lib/data';
import { createClient } from "@supabase/supabase-js";

const supabaseKey = process.env.SUPABASE_KEY!//getEnvVariable('SUPABASE_KEY');
const supabaseUrl = process.env.SUPABASE_URL!//getEnvVariable('SUPABASE_URL');

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  return NextResponse.json({
    hello: "World"
  })
}

export async function POST(request: Request) {
  console.log(`request in api route.ts fo rsupabase: ${JSON.stringify(request)}`)
  const res = await request.json()
  console.log(`data inside route handler post function: ${JSON.stringify(res)}`)
  const { data, error } = await supabase
  .from('submitted_dummy')
  .insert([
    res,
  ])
  .select()
    console.log('data from supabase call: ', {data})
  return NextResponse.json({
    res,
  })
}