import React from 'react';
import { Transaction, TRANSACTION_STATUS_LABELS, TRANSACTION_STATUS_COLORS, formatCurrency, formatDate } from '@/app/types/transaction/transaction';

interface TransactionCardProps {
  transaction: Transaction;
  onView?: (transaction: Transaction) => void;
  onUpdateStatus?: (transaction: Transaction) => void;
  onCancel?: (transaction: Transaction) => void;
  showActions?: boolean;
  userRole?: string;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  onView,
  onUpdateStatus,
  onCancel,
  showActions = false,
  userRole = 'USER'
}) => {

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {transaction.event?.title || 'Event Tidak Ditemukan'}
          </h3>
          <p className="text-sm text-gray-600">
            ID: {transaction.id}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${TRANSACTION_STATUS_COLORS[transaction.status]}`}>
          {TRANSACTION_STATUS_LABELS[transaction.status]}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Total Harga:</span>
          <span className="text-sm font-medium">
            {formatCurrency(transaction.totalIdr)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Tanggal Transaksi:</span>
          <span className="text-sm">
            {transaction.createdAt ? new Date(transaction.createdAt).toLocaleDateString('id-ID') : '-'}
          </span>
        </div>
        {transaction.coupon && (
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Kupon:</span>
            <span className="text-sm text-green-600">
              {transaction.coupon.code}
            </span>
          </div>
        )}
        {transaction.user.points > 0 && (
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Points User:</span>
            <span className="text-sm text-blue-600">
              {transaction.user.points}
            </span>
          </div>
        )}
      </div>

      {showActions && (
        <div className="flex gap-2 pt-4 border-t border-gray-200">
          {onView && (
            <button
              onClick={() => onView(transaction)}
              className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Lihat Detail
            </button>
          )}
          {onUpdateStatus && userRole === 'ORGANIZER' && (
            <button
              onClick={() => onUpdateStatus(transaction)}
              className="flex-1 px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Update Status
            </button>
          )}
          {onCancel && transaction.status === 'WAITING_FOR_PAYMENT' && (
            <button
              onClick={() => onCancel(transaction)}
              className="flex-1 px-3 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Batalkan
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export { TransactionCard };