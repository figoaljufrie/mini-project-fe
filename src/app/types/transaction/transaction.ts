// Transaction types untuk frontend
export interface CreateTransactionRequest {
  eventId: number;
  couponId?: number;
  pointsUsed?: number;
}

export interface Transaction {
  id: number;
  userId: number;
  eventId: number;
  status: TransactionStatus;
  totalIdr: number;
  createdAt: string;
  paymentProofUrl?: string;
  paymentProofPublicId?: string;
  couponId?: number;
  user: {
    id: number;
    name: string;
    email: string;
    points: number;
  };
  event: {
    eventId: number;
    title: string;
    category: string;
    location: string;
    startsAt: string;
    endsAt: string;
    priceIdr: number;
    isFree: boolean;
    organizer: {
      id: number;
      name: string;
      email: string;
    };
  };
  coupon?: {
    id: number;
    code: string;
    discountIdr: number;
    type: string;
  };
}

export interface TransactionFormData {
  eventId: string; // string untuk form input
  couponId?: string; // string untuk form input
  pointsUsed?: string; // string untuk form input
}

export interface UpdateTransactionStatusRequest {
  status: TransactionStatus;
  adminNotes?: string;
}

export interface TransactionStats {
  totalTransactions: number;
  totalRevenue: number;
  pendingTransactions: number;
  completedTransactions: number;
  rejectedTransactions: number;
}

export interface PaginatedTransactionResponse {
  data: Transaction[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface TransactionFilters {
  userId?: number;
  eventId?: number;
  status?: TransactionStatus;
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
  page?: number;
  limit?: number;
}

export enum TransactionStatus {
  WAITING_FOR_PAYMENT = "WAITING_FOR_PAYMENT",
  WAITING_FOR_ADMIN_CONFIRMATION = "WAITING_FOR_ADMIN_CONFIRMATION",
  DONE = "DONE",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED",
  CANCELED = "CANCELED"
}

export const TRANSACTION_STATUS_LABELS: Record<TransactionStatus, string> = {
  [TransactionStatus.WAITING_FOR_PAYMENT]: "Menunggu Pembayaran",
  [TransactionStatus.WAITING_FOR_ADMIN_CONFIRMATION]: "Menunggu Konfirmasi Admin",
  [TransactionStatus.DONE]: "Selesai",
  [TransactionStatus.REJECTED]: "Ditolak",
  [TransactionStatus.EXPIRED]: "Kedaluwarsa",
  [TransactionStatus.CANCELED]: "Dibatalkan"
};

export const TRANSACTION_STATUS_COLORS: Record<TransactionStatus, string> = {
  [TransactionStatus.WAITING_FOR_PAYMENT]: "bg-yellow-100 text-yellow-800",
  [TransactionStatus.WAITING_FOR_ADMIN_CONFIRMATION]: "bg-blue-100 text-blue-800",
  [TransactionStatus.DONE]: "bg-green-100 text-green-800",
  [TransactionStatus.REJECTED]: "bg-red-100 text-red-800",
  [TransactionStatus.EXPIRED]: "bg-gray-100 text-gray-800",
  [TransactionStatus.CANCELED]: "bg-orange-100 text-orange-800"
};

// Helper function untuk format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

// Helper function untuk format date
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};