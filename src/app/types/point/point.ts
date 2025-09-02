export interface PointTransaction {
  id: number
  userId: number
  amount: number
  expiresAt: string
  used: boolean
  createdAt: string
}