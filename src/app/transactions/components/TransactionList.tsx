import { useState, useEffect, useCallback } from 'react';
import { 
  Transaction, 
  TransactionFormData, 
  TransactionFilters,
  UpdateTransactionStatusRequest,
  TransactionStats
} from '@/app/types/transaction/transaction';
import { 
  getTransactions, 
  getTransactionById, 
  createTransaction, 
  getOrganizerTransactions,
  getUserTransactions,
  updateTransactionStatus, 
  cancelTransaction,
  getTransactionStats,
  getExpiringTransactions
} from '@/app/transactions/services/transaction.service';

// Hook untuk manage transactions
export const useTransactions = (filters?: TransactionFilters) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async (newFilters?: TransactionFilters) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getTransactions(newFilters || filters);
      setTransactions(data.data);
      setPagination(data.pagination);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal mengambil data transactions');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    transactions,
    pagination,
    loading,
    error,
    fetchTransactions,
    refetch: fetchTransactions
  };
};

// Hook untuk manage single transaction
export const useTransaction = (transactionId: number | null) => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransaction = useCallback(async () => {
    if (!transactionId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getTransactionById(transactionId);
      setTransaction(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal mengambil detail transaction');
    } finally {
      setLoading(false);
    }
  }, [transactionId]);

  useEffect(() => {
    fetchTransaction();
  }, [fetchTransaction]);

  return {
    transaction,
    loading,
    error,
    refetch: fetchTransaction
  };
};

// Hook untuk manage organizer transactions
export const useOrganizerTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrganizerTransactions = useCallback(async (page: number = 1, limit: number = 10) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getOrganizerTransactions(page, limit);
      setTransactions(data.data);
      setPagination(data.pagination);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal mengambil transactions organizer');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrganizerTransactions();
  }, [fetchOrganizerTransactions]);

  return {
    transactions,
    pagination,
    loading,
    error,
    fetchOrganizerTransactions,
    refetch: fetchOrganizerTransactions
  };
};

// Hook untuk manage user transactions
export const useUserTransactions = (userId: number | null) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserTransactions = useCallback(async (page: number = 1, limit: number = 10) => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getUserTransactions(userId, page, limit);
      setTransactions(data.data);
      setPagination(data.pagination);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal mengambil transactions user');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserTransactions();
  }, [fetchUserTransactions]);

  return {
    transactions,
    pagination,
    loading,
    error,
    fetchUserTransactions,
    refetch: fetchUserTransactions
  };
};

// Hook untuk create transaction
export const useCreateTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createTransactionHandler = useCallback(async (formData: TransactionFormData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const newTransaction = await createTransaction(formData);
      setSuccess(true);
      return newTransaction;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Gagal membuat transaction';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return {
    createTransaction: createTransactionHandler,
    loading,
    error,
    success,
    reset
  };
};

// Hook untuk update transaction status
export const useUpdateTransactionStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateTransactionStatusHandler = useCallback(async (
    transactionId: number, 
    updateData: UpdateTransactionStatusRequest
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const updatedTransaction = await updateTransactionStatus(transactionId, updateData);
      setSuccess(true);
      return updatedTransaction;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Gagal mengupdate status transaction';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return {
    updateTransactionStatus: updateTransactionStatusHandler,
    loading,
    error,
    success,
    reset
  };
};

// Hook untuk cancel transaction
export const useCancelTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const cancelTransactionHandler = useCallback(async (transactionId: number) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      await cancelTransaction(transactionId);
      setSuccess(true);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Gagal membatalkan transaction';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return {
    cancelTransaction: cancelTransactionHandler,
    loading,
    error,
    success,
    reset
  };
};

// Hook untuk transaction statistics
export const useTransactionStats = (userId?: number, eventId?: number) => {
  const [stats, setStats] = useState<TransactionStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getTransactionStats(userId, eventId);
      setStats(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal mengambil statistik transactions');
    } finally {
      setLoading(false);
    }
  }, [userId, eventId]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
};

// Hook untuk expiring transactions
export const useExpiringTransactions = (limit: number = 10) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExpiringTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getExpiringTransactions(limit);
      setTransactions(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal mengambil expiring transactions');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchExpiringTransactions();
  }, [fetchExpiringTransactions]);

  return {
    transactions,
    loading,
    error,
    refetch: fetchExpiringTransactions
  };
};