// src/app/dashboard/services/transactionService.ts
export type Transaction = {
  id: string | number;
  user?: { name?: string };
  event?: { title?: string };
  totalIdr?: number;
  status?: string;
};

export const transactionService = {
  // Fetch all transactions
  getAll: async (): Promise<Transaction[]> => {
    const res = await fetch("/api/transactions");
    if (!res.ok) throw new Error(`Failed to fetch transactions. Status: ${res.status}`);
    const data = await res.json();
    return data;
  },

  // Update transaction status (approve/reject)
  updateStatus: async (id: string | number, status: string): Promise<void> => {
    const res = await fetch(`/api/transactions/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error(`Failed to update transaction. Status: ${res.status}`);
  },

  // Optional: fetch single transaction
  getById: async (id: string | number): Promise<Transaction> => {
    const res = await fetch(`/api/transactions/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch transaction ${id}. Status: ${res.status}`);
    const data = await res.json();
    return data;
  },
};