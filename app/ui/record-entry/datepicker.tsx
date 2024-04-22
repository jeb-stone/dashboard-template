

import * as React from 'react';
//import { useState } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function BasicDatePicker(date: Date) {
  // const [selectedDate, setSelectedDate] = useState(date)
  // const handleDateChange = (date: Date) => {
  //   setSelectedDate(date);
  // }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker 
          label="Select a Date"
          defaultValue={dayjs(new Date())}
          //onChange={handleDateChange}
         />
      </DemoContainer>
    </LocalizationProvider>
  );
}