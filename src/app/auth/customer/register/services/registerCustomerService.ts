// auth/customer/register/services/customerService.ts
export interface RegisterCustomerData {
  name: string;
  email: string;
  username: string;
  password: string;
  referralCode?: string;
}

export const registerCustomer = async (data: RegisterCustomerData) => {
  const res = await fetch("http://localhost:8000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Customer registration failed");
  }

  return res.json();
};