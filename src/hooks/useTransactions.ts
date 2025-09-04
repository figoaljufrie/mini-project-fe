import api from "@/lib/api/api";
import type { 
  Transaction, 
  CreateTransactionRequest, 
  TransactionFormData,
  UpdateTransactionStatusRequest,
  TransactionStats,
  PaginatedTransactionResponse,
  TransactionFilters
} from "@/app/types/transaction/transaction";

// Interface untuk response API
export interface TransactionResponse {
  data: Transaction;
}

export interface TransactionsResponse {
  data: PaginatedTransactionResponse;
}

export interface CreateTransactionResponse {
  data: {
    id: number;
    userId: number;
    eventId: number;
    status: string;
    totalIdr: number;
    couponId?: number;
    createdAt: string;
    event: {
      title: string;
      category: string;
      location: string;
      startsAt: string;
      endsAt: string;
      priceIdr: number;
      isFree: boolean;
    };
    user: {
      id: number;
      name: string;
      email: string;
      points: number;
    };
  };
}

export interface TransactionStatsResponse {
  data: TransactionStats;
}

// Helper function untuk convert form data ke API format
const convertFormDataToApiFormat = (formData: TransactionFormData): CreateTransactionRequest => {
  return {
    eventId: Number(formData.eventId),
    ...(formData.couponId && { couponId: Number(formData.couponId) }),
    ...(formData.pointsUsed && { pointsUsed: Number(formData.pointsUsed) })
  };
};

// Get all transactions dengan filter opsional
export const getTransactions = async (filters?: TransactionFilters): Promise<PaginatedTransactionResponse> => {
  const res = await api.get("/transactions", { params: filters });
  return res.data.data || res.data;
};

// Get transaction by ID
export const getTransactionById = async (transactionId: number): Promise<Transaction> => {
  const res = await api.get(`/transactions/${transactionId}`);
  return res.data.data || res.data;
};

// Create transaction baru (pembelian tiket)
export const createTransaction = async (formData: TransactionFormData): Promise<CreateTransactionResponse> => {
  const apiData = convertFormDataToApiFormat(formData);
  const res = await api.post("/transactions/create-transaction", apiData);
  return res.data;
};

// Get organizer transactions
export const getOrganizerTransactions = async (page: number = 1, limit: number = 10): Promise<PaginatedTransactionResponse> => {
  const res = await api.get("/transactions/organizer/me", { 
    params: { page, limit } 
  });
  return res.data.data || res.data;
};

// Get user transactions
export const getUserTransactions = async (userId: number, page: number = 1, limit: number = 10): Promise<PaginatedTransactionResponse> => {
  const res = await api.get(`/transactions/user/${userId}`, { 
    params: { page, limit } 
  });
  return res.data.data || res.data;
};

// Update transaction status (ORGANIZER ONLY)
export const updateTransactionStatus = async (
  transactionId: number, 
  updateData: UpdateTransactionStatusRequest
): Promise<Transaction> => {
  const res = await api.put(`/transactions/${transactionId}/status`, updateData);
  return res.data.data || res.data;
};

// Cancel transaction (USER OWNER ONLY)
export const cancelTransaction = async (transactionId: number): Promise<Transaction> => {
  const res = await api.delete(`/transactions/${transactionId}`);
  return res.data.data || res.data;
};

// Get transaction statistics
export const getTransactionStats = async (userId?: number, eventId?: number): Promise<TransactionStats> => {
  const params: any = {};
  if (userId) params.userId = userId;
  if (eventId) params.eventId = eventId;
  
  const res = await api.get("/transactions/stats", { params });
  return res.data.data || res.data;
};

// Get expiring transactions
export const getExpiringTransactions = async (limit: number = 10): Promise<Transaction[]> => {
  const res = await api.get("/transactions/expiring", { 
    params: { limit } 
  });
  return res.data.data || res.data;
};