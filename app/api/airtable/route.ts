
import { NextRequest, NextResponse } from "next/server"
import  Airtable  from "airtable";

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_PAT
});
const baseId = process.env.AT_BASE_ID ? process.env.AT_BASE_ID : ''
const base = new Airtable({apiKey: process.env.AIRTABLE_PAT}).base(baseId);

export async function POST(req: Request, res: Response) {
  try {
    const requestBody = await req.json()
    console.log(`requestBody: ${JSON.stringify(requestBody)}`)
    
    base('JBS_RSD_SUBS').create(requestBody, {typecast: true}, function(err:any, records: any) {
        if (err) {
          console.error('Error with posting from base.create: ', err)
          
        }
        if (records) {

          records.forEach((record: any) => {
            console.log({record})
          })
        }

    })

    return NextResponse.json(
      { body: 'Success' }, 
      { status: 200 })

  } catch (error) {
    console.error(`Error posting to Airtable: ${error}`)
  }  
}

export async function GET() {
  console.log(process.env.AT_PAT3)
  const url = baseId + process.env.AIRTABLE_SUBMITTED_DEV
  const res = await fetch(url, {
    headers: {
      "Authorization" : `Bearer ${process.env.AT_PAT2}`,
      "Content-Type" : "application/json"
    }
  })
  const data = await res.json()

  return Response.json({ data })

}