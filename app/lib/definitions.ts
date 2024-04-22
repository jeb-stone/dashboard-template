
export type Record = {
  rates2id: string;
  e_mail: string;
  exp_reader: string;
  exp_trialid: string;
  exp_ratetype: string;
  exp_ratetypecat: string;
  r_rate: number;
}

export type RecordEntryFormProps = {
  trialData: Record[];
};

export type RateDetails = {
  id: string;
  rate: number;
  category: string;
}

export type RateTypes = {
  [key: string] : RateDetails // key is ratetype
}

export type TrialIdStructure = {
  [key: string]: RateTypes; // key is trial_id
}
 
export type SingleRecord = [ string, string | null, string | number, number ];

export type SubmittedRow = {
  reader: string;
  date_performed: Date | null | string;
  trial_id: string;
  rate_type: string;
  amount_of_work: number;
  rate: number;
  est_earnings: number;
  category: string;
  rates2_id: string;
}

export type ATRecord = {
    fields: {
    TsRecordID: string | null;
    Date: Date | null | string;
    CreateDT: Date | null | string;
    "Trial Code": string[];
    Type: string[] | null;
    Reader: string[];
    SubjCode?: string | null;
    SubmitDT: Date | string;
    Reads: number | null;
    Minutes?: number | null;
    Comment?: string;
    ConcatR2Check?: string[];
  }
}

export type AirtableRecords = [ATRecord]
 
// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      movies: {
        Row: {               // the data expected from .select()
          id: number
          name: string
          data: Json | null
        }
        Insert: {            // the data to be passed to .insert()
          id?: never         // generated columns must not be supplied
          name: string       // `not null` columns with no default must be supplied
          data?: Json | null // nullable columns can be omitted
        }
        Update: {            // the data to be passed to .update()
          id?: never
          name?: string      // `not null` columns are optional on .update()
          data?: Json | null
        }
      }
    }
  }
}