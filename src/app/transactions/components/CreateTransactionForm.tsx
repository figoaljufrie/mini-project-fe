import React from 'react';
import { Transaction, 
    TransactionStatus, TRANSACTION_STATUS_LABELS, 
    TRANSACTION_STATUS_COLORS, formatCurrency, 
    formatDate } 
    from '@/app/types/transaction/transaction';

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
  const canUpdateStatus = userRole === 'ORGANIZER' && 
    transaction.status === TransactionStatus.WAITING_FOR_ADMIN_CONFIRMATION;
  
  const canCancel = userRole === 'USER' && 
    transaction.status === TransactionStatus.WAITING_FOR_PAYMENT;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {transaction.event.title}
            </h3>
            <p className="text-sm text-gray-600">
              {transaction.event.category} • {transaction.event.location}
            </p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${TRANSACTION_STATUS_COLORS[transaction.status as TransactionStatus]}`}>
            {TRANSACTION_STATUS_LABELS[transaction.status as TransactionStatus]}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Pembayaran:</span>
            <span className="font-medium">{formatCurrency(transaction.totalIdr)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tanggal Transaksi:</span>
            <span>{formatDate(transaction.createdAt)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tanggal Event:</span>
            <span>{formatDate(transaction.event.startsAt)}</span>
          </div>

          {transaction.coupon && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Kupon:</span>
              <span className="text-green-600">{transaction.coupon.code} (-{formatCurrency(transaction.coupon.discountIdr)})</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Pembeli:</span>
            <span>{transaction.user.name}</span>
          </div>
        </div>

        {showActions && (
          <div className="flex justify-end space-x-2 pt-4 border-t">
            {onView && (
              <button
                onClick={() => onView(transaction)}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
              >
                Lihat Detail
              </button>
            )}
            
            {canUpdateStatus && onUpdateStatus && (
              <button
                onClick={() => onUpdateStatus(transaction)}
                className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
              >
                Update Status
              </button>
            )}
            
            {canCancel && onCancel && (
              <button
                onClick={() => onCancel(transaction)}
                className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
              >
                Batalkan
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionCard;