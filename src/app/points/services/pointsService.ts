// services/pointsService.ts
import api, { setAuthToken } from "@/lib/api/api";
// ✅ No need for userId anymore, backend knows from auth
export async function getUserPoints() {
  const { data } = await api.get("/auth/me");
  // assuming backend response is like { success: true, message: "...", data: { ...user, availablePoints } }
  return data.data.availablePoints; 
}

// // If you want the whole transaction history, create a backend route like `/points/transactions/me`
// export async function getPointTransactions() {
//   const { data } = await api.get("/points/transactions/me");
//   return data.data;
// }