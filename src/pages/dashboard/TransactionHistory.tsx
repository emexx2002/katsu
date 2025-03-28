import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Table } from '../../components/Table/Table';
import { Button } from '../../components/Button/Button';
import SearchInput from '../../components/FormInputs/SearchInput';
import Spinner from '../../components/spinner/Spinner';
import { transactionServices, Transaction } from '../../services/transactions';
import { formatCurrency } from '../../utils/helpers';
import TransactionDetailsModal from '../../components/TransactionDetails/TransactionDetailsModal';
import useFetchWithParams from '../../hooks/useFetchWithParams';
import { fDate } from '../../utils/formatTime';

const TransactionHistory = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [accountType, setAccountType] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const pageSize = 10;

  // Build filters object based on selected filters
  const filters = {
    ...(search && { search }),
    ...(accountType && { accountType }),
    ...(transactionType && { transactionType }),
    ...(dateFilter && { dateFilter }),
    ...(activeTab !== 'All' && { transactionCategory: activeTab.toUpperCase() })
  };

  const { data: transactionsData, isLoading: loadingTransactions } = useFetchWithParams(
    [`transactions`, {
      ...filters,
      page: page
    }],
    transactionServices.getAllTransactions,
    {
      onSuccess: (data: any) => {
      },
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  )


  // Fetch the selected transaction data
  const { data: selectedTransaction } = useQuery(
    ['transaction', selectedTransactionId],
    () => transactionServices.getTransactionById(Number(selectedTransactionId)),
    {
      enabled: !!selectedTransactionId,
      staleTime: 60000 // Cache for 1 minute
    }
  );

  const handleViewTransaction = (id: number) => {
    setSelectedTransactionId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Optional: delay clearing the ID to prevent UI flicker during modal close animation
    setTimeout(() => setSelectedTransactionId(null), 300);
  };

  const handleFilter = () => {
    // Reset to first page when applying filters
    setPage(0);
  };

  return (
    <section className="px-8 py-8">
      {/* Pass the full transaction object instead of just the ID */}
      <TransactionDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        transaction={selectedTransaction || null}
      />

      <div className="mb-6">
        <h1 className="text-2xl font-bold">Transaction History</h1>
      </div>

      {/* Transaction Type Tabs */}
      <div className="bg-white rounded-md shadow mb-4">
        <div className="border-b border-gray-200 flex justify-between items-center pr-4">
          <nav className="flex">
            {['All', 'Credit', 'Debit'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-8 text-sm font-medium ${activeTab === tab
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          <Button
            label="Generate Statement"
            className="bg-blue-100 text-blue-600 hover:bg-blue-200"
          />
        </div>
      </div>

      <div className="bg-white rounded-md shadow">
        <div className="flex items-center gap-4 p-4 border-b">
          <SearchInput
            placeholder="Search by Amount, Transaction ID or sender/receiver name"
            className="flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="h-10 border rounded px-3"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          >
            <option value="">Account Type</option>
            <option value="manufacturer">Manufacturer</option>
            <option value="distributor">Distributor</option>
          </select>

          <select
            className="h-10 border rounded px-3"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="">Transaction Type</option>
            <option value="transfer">Transfer</option>
            <option value="deposit">Deposit</option>
          </select>

          <select
            className="h-10 border rounded px-3"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="">Filter by date</option>
            <option value="today">Today</option>
            <option value="last7days">Last 7 days</option>
            <option value="last30days">Last 30 days</option>
            <option value="thisMonth">This month</option>
            <option value="lastMonth">Last month</option>
          </select>

          <Button
            label="Filter"
            onClick={handleFilter}
          />
        </div>

        <Table
          loading={loadingTransactions}
          columns={[
            {
              header: 'Transaction ID',
              view: (row: Transaction) => row.reference || row.id
            },
            {
              header: 'Receiver / Sender',
              view: (row: Transaction) => row.fromAccountName || 'N/A'
            },
            {
              header: 'Transaction Type',
              view: (row: Transaction) => 'Transfer'
            },
            {
              header: 'Transaction Date',
              view: (row: Transaction) => fDate(row.transactionTime || row.createdDate).toLocaleString()
            },
            {
              header: 'Amount',
              view: (row: Transaction) => formatCurrency(row.amount)
            },
            {
              header: 'Status',
              view: (row: Transaction) => (
                <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                  {row.processErrors && row.processErrors.length > 0 ? 'Failed' : 'Successful'}
                </span>
              )
            },
            {
              header: 'Action',
              view: (row: Transaction) => (
                <Button
                  label="View"
                  variant="outlined"
                  onClick={() => handleViewTransaction(row.id)}
                />
              )
            },
          ]}
          data={transactionsData?.content || []}
          pagination={{
            totalRows: transactionsData?.totalElements || 0,
            pageSize: pageSize,
            page: page + 1,
            setPage: (newPage) => setPage(newPage - 1)
          }}
        />
      </div>
    </section>
  );
};

export default TransactionHistory;