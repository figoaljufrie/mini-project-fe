export type CouponType = "REFERRAL" | "ORGANIZER"
export type CouponStatus = "AVAILABLE" | "USED" | "EXPIRED"

export interface Coupon {
  id: number
  code: string
  discountIdr: number
  type: CouponType
  status: CouponStatus
  expiresAt?: string
  usedAt?: string
  createdAt: string
  userId?: number
  organizerId?: number
  quantity?: number
}