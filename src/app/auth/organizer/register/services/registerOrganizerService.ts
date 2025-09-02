// /app/auth/services/authService.ts
export interface OrganizerRegisterData {
  name: string;
  email: string;
  username: string;
  password: string;
}

export const registerOrganizer = async (data: OrganizerRegisterData) => {
  const res = await fetch("http://localhost:8000/api/organizer/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Registration failed");
  }

  return await res.json(); // return created organizer info
};