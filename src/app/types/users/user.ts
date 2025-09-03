import { Coupon } from "@/app/types/coupon/coupon";
import { Transaction } from "@/app/types/transaction/transaction";
import { PointTransaction } from "@/app/types/point/point";
import { Event } from "@/app/types/event/event";

export type Role = "CUSTOMER" | "ORGANIZER";

export interface BaseUser {
  id: number;
  name: string;
  email: string;
  username: string;
  role: Role;
  referralCode?: string;
  referredById?: number;
  points: number;
  coupon: number;
  createdAt: string;
  updatedAt: string;
  avatarUrl: string | null;
  avatarPublicId: string | null;
}

export type LoginResponse = {
  accessToken: string;
  user: User;
};

export interface CustomerUser extends BaseUser {
  role: "CUSTOMER";
  referees?: CustomerUser[];
  coupons?: Coupon[];
  transactions?: Transaction[];
  pointsTransactions?: PointTransaction[];
}

export interface OrganizerUser extends BaseUser {
  role: "ORGANIZER";
  organizerCoupons?: Coupon[];
  events?: Event[];
  transactions?: Transaction[];
}

export type User = CustomerUser | OrganizerUser;
