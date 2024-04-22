'use client'

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ATRecord, AirtableRecords, RecordEntryFormProps, SingleRecord, SubmittedRow } from '@/app/lib/definitions'
import { createRecordID, transformTrialData } from '@/app/lib/utils'
import { Children, useState } from 'react'
import BasicDatePicker from './datepicker';
import { Button } from '../button';
import dayjs,  { Dayjs } from 'dayjs';
import { postRecordToSupabase, postRecordToAirtable } from '@/app/lib/data';




export default function RecordEntryForm ({trialData}: RecordEntryFormProps) {

  const [dataForSubmission, setDataForSubmission] = useState<( null | ATRecord[])>(null)
  const [trialCode, setTrialCode] = useState('')
  const [rateType, setRateType] = useState('')
  const [amountOfWork, setAmountOfWork] = useState(0)
  const [createDate, setCreateDate] = useState<null | Date | string>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null | string>(new Date())
  const formData = transformTrialData({trialData})
  const trialCodes = Object.keys(formData)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // setDataForSubmission(prevState => ({
    //   ...prevState,
    //   [name]: value
    // }));
  }

  const handleDateChange = (date: Date) => {
    const formattedDate = dayjs(date)
    setSelectedDate(date);
  }

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /**
     * buildRecord() 
     * takes inputs/selections and builds a record containing all the fields in the Submitted table
     */
    const rate = formData[trialCode][rateType].rate;
    const reader = trialData[0].exp_reader;
    const estEarnings = rate * amountOfWork;
    const ATFormatDate = selectedDate ? selectedDate.toString().split('T')[0] : 'No Date Selected'
    console.log(typeof selectedDate)
    console.log(JSON.stringify(ATFormatDate))
    const submitDt = new Date()
    const recordId = createRecordID(submitDt)
    //const formattedDate = typeof selectedDate === Date ? selectedDate.toISOString() : selectedDate;
    const submissionData =  [
        {
          fields: {
            TsRecordID: recordId,
            Date: ATFormatDate,
            CreateDT: createDate,
            "Trial Code": [trialCode],
            Type: [rateType],
            Reader: [reader],
            SubmitDT: submitDt,
            Reads: amountOfWork,
            ConcatR2Check: [formData[trialCode][rateType].id ]
          } 
        }
      ]
    

    const supabaseRow: SubmittedRow = {
      reader: reader,
      date_performed: selectedDate,
      trial_id: trialCode,
      rate_type: rateType,
      amount_of_work: amountOfWork,
      rate: rate,
      est_earnings: estEarnings,
      category: formData[trialCode][rateType].category,
      rates2_id: formData[trialCode][rateType].id  
    }

    // Post record to Supabase - Move this to a utils directory
    try{
      const response = await fetch('/api', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(supabaseRow)
      });
      if (response) {
        const data = await response.json();
        console.log('Response from POST req from frontend: ', data)
      }

    } catch (error) {
      console.log(error)
    }

    // Post record to Airtable - Move this to a utils directory
    try {
      console.log(`airtable frontend submission data: ${JSON.stringify(submissionData)}`);
      const response = await fetch('/api/airtable', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify( submissionData ) // Assuming your API expects an object with a 'records' property
      });
    } catch (error) {
      console.error({error})
    }
    setDataForSubmission(submissionData)
    console.log({e})
    console.log({submissionData})
  }
  
  return (
    <div className='border-green-200 border-2'>
      <form onSubmit={handleSubmit}>
        <div className='flex '>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/* <DemoContainer components={['DatePicker']}> */}
                <DatePicker
                  //label="Select a date"
                  value={null}
                  onChange={(value) => {
                    console.log({value})
                    setCreateDate(new Date().toISOString())
                    setSelectedDate(value ? value.toISOString() : null)
                  }}
                />
              {/* </DemoContainer> */}
            </LocalizationProvider>
          </div>
          <select name="" id="" value={trialCode} onChange={e => setTrialCode(e.target.value)}>
            <option value="">Select a trial</option>
            {trialCodes.map(code => <option key={code} value={code}>{code}</option>)}
          </select>
          <select name="" id="" onChange={e => setRateType(e.target.value)}>
            <option value="">Select a Type</option>
            {trialCode ? Object.keys(formData[trialCode]).map(type => 
              <option key={`${trialCode}_${type}`} value={type}>
                {type}
              </option>
            ) : []}
          </select>
          <input type="text" placeholder={'Enter a Value'} onChange={e => setAmountOfWork(Number( e.target.value))}/>
        </div>
        <Button type="submit">Submit</Button>
        {/* <button type="submit">Submit</button> */}
      </form>
    </div>
  )
}