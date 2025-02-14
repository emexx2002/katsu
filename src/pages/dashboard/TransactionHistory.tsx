import React from 'react'
import TabBar from '../../components/Tab/TabBar'
import { Button } from '../../components/Button/Button'
import { Table } from '../../components/Table/Table'
import SearchInput from '../../components/FormInputs/SearchInput'
import TransactionDetailsModal from '../../components/TransactionDetails/TransactionDetailsModal'
import GenerateStatementModal from '../../components/Statement/GenerateStatementModal'

const TransactionHistory = () => {
  const [selectedTransaction, setSelectedTransaction] = React.useState<any>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isStatementModalOpen, setIsStatementModalOpen] = React.useState(false);

  const columns = [
    {
      header: 'Transaction ID',
      view: (row: any) => row.transactionId
    },
    {
      header: 'Receiver / Sender',
      view: (row: any) => row.receiver
    },
    {
      header: 'Transaction Type',
      view: (row: any) => row.type
    },
    {
      header: 'Transaction Date',
      view: (row: any) => row.date
    },
    {
      header: 'Amount',
      view: (row: any) => `₦${row.amount}`
    },
    {
      header: 'Status',
      view: (row: any) => (
        <span className={`px-3 py-1 rounded-full text-sm ${
          row.status === 'Successful' ? 'bg-green-100 text-green-800' : ''
        }`}>
          {row.status}
        </span>
      )
    }
  ]

  const mockData = [
    {
      transactionId: '123456789012345',
      receiver: 'Adepoju Ridwan',
      type: 'Transfer',
      date: '24 Jul 2022 3:00 AM',
      amount: '30,000.00',
      status: 'Successful'
    },
    // ... more mock data can be added here
  ]

  const handleViewDetails = (row: any) => {
    setSelectedTransaction(row);
    setIsModalOpen(true);
  };

  const rowActions = (row: any) => [
    {
      name: 'View Details',
      action: () => handleViewDetails(row)
    }
  ]

  return (
    <div className='w-full h-full space-y-4 px-8 py-8'>
       <TransactionDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transaction={selectedTransaction}
      />
      <GenerateStatementModal
        isOpen={isStatementModalOpen}
        onClose={() => setIsStatementModalOpen(false)}
      />
      <div className='w-full flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Transaction History</h1>
        
      </div>

      <div className='w-full'>
        <div className='flex items-center justify-between'>
          <TabBar tabs={['All', 'Credit', 'Debit']} />
          <Button 
            label="Generate Statement"
            className='!bg-[#1977F214] font-semibold !text-primary'
            size="small"
            onClick={() => setIsStatementModalOpen(true)}
          />
        </div>
        
        <div className='mt-4 bg-white rounded-md'>
          <Table 
            columns={columns}
            data={mockData}
            loading={false}
            rowActions={rowActions}
            pagination={{
              page: 1,
              pageSize: 8,
              totalRows: 68,
              setPage: (page) => console.log('Page:', page),
              setPageSize: (size) => console.log('Size:', size)
            }}
            topSlot={
              <div className='flex items-center gap-4 p-4'>
                <SearchInput 
                  placeholder="Search by Amount, Transaction ID or sender/receiver name"
                  className="flex-1"
                />
                <select className="h-10 border rounded px-3">
                  <option>Account Type</option>
                </select>
                <select className="h-10 border rounded px-3">
                  <option>Transaction Type</option>
                </select>
                <select className="h-10 border rounded px-3">
                  <option>Filter by date</option>
                </select>
              </div>
            }
          />
        </div>
      </div>  

     
    </div>
  )
}

export default TransactionHistory