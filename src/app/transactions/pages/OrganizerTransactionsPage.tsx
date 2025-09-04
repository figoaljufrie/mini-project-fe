import React from 'react';
import { Transaction } from '@/app/types/transaction/transaction';
import { TransactionCard } from '@/app/transactions/components/TransactionCard';

interface TransactionListProps {
  transactions: Transaction[];
  loading?: boolean;
  error?: string | null;
  onView?: (transaction: Transaction) => void;
  onUpdateStatus?: (transaction: Transaction) => void;
  onCancel?: (transaction: Transaction) => void;
  showActions?: boolean;
  userRole?: string;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  loading = false,
  error = null,
  onView,
  onUpdateStatus,
  onCancel,
  showActions = false,
  userRole = 'USER'
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p className="text-lg font-medium">Terjadi Kesalahan</p>
          <p className="text-sm text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-lg font-medium text-gray-600">Belum Ada Transaksi</p>
          <p className="text-sm text-gray-500">Belum ada transaksi yang tersedia saat ini</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {transactions.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          transaction={transaction}
          onView={onView}
          onUpdateStatus={onUpdateStatus}
          onCancel={onCancel}
          showActions={showActions}
          userRole={userRole}
        />
      ))}
    </div>
  );
};

export default TransactionList;