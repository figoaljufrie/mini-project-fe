export type TransactionStatus =
  | "WAITING_FOR_PAYMENT"
  | "WAITING_FOR_ADMIN_CONFIRMATION"
  | "DONE"
  | "REJECTED"
  | "EXPIRED"
  | "CANCELED"

export interface Transaction {
  id: number
  userId: number
  eventId: number
  status: TransactionStatus
  totalIdr: number
  createdAt: string
  couponId?: number
}