// types/enums.ts
export type Role = "CUSTOMER" | "ORGANIZER";

export type CouponType = "REFERRAL" | "ORGANIZER";

export type CouponStatus = "AVAILABLE" | "USED" | "EXPIRED";

export type TxStatus =
  | "WAITING_FOR_PAYMENT"
  | "WAITING_FOR_ADMIN_CONFIRMATION"
  | "DONE"
  | "REJECTED"
  | "EXPIRED"
  | "CANCELED";