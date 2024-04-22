import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '../ui/dashboard/revenue-chart';
import LatestInvoices from '../ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue, fetchTrialData } from '../lib/data';
import RecordEntryForm from '../ui/record-entry/record-entry-form';
import RecentlySubmitted from '../ui/submissions/recently-submitted';

export default async function Page () {
  
  const trialData = await fetchTrialData('jeb.stone@radmetrix.com');
  const revenue = await fetchRevenue();

  if(!trialData) {
    return (
      <div>No Trial Data</div>
   ) 
  }

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      {/* grid gap-6 sm:grid-cols-2 lg:grid-cols-4 */}
      <div className=''>
        <div className='flex flex-col mt-12 border-2 border-red-600 grow'>
          <RecordEntryForm trialData={trialData} />
          <RecentlySubmitted/>
        </div>

          {/* <Card title="Collected" value={totalPaidInvoices} type="collected" /> */}
        {/* <Card title="Pending" value={totalPendingInvoices} type="pending" /> */}
        {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
        {/* <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
      </div>
      <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8'>
        {/* <RevenueChart revenue={revenue}  />
        <LatestInvoices latestInvoices={latestInvoices} /> */}
      </div>
    </main>
  )
}