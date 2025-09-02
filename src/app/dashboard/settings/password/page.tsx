"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PiEyesLight } from "react-icons/pi";
import { usePassword } from "./hooks/usePassword";

export default function PasswordPage() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading, error, success, updatePassword } = usePassword();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Frontend validation
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    // Call hook to update password
    await updatePassword(currentPassword, newPassword);

    // Clear inputs on success
    if (!error) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-black mb-4">Change Password</h2>

      <Card className="backdrop-blur-xl bg-gradient-to-br from-teal-400/20 via-teal-500/20 to-teal-600/20 border border-teal-700/30 shadow-md rounded-xl transition hover:shadow-[0_6px_18px_rgba(0,128,128,0.4)]">
        <CardContent>
          <form
            onSubmit={handleSave}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start"
          >
            <div className="space-y-6 text-black">
              {/* Current Password */}
              <div className="relative">
                <label className="block text-sm font-medium mb-1">
                  Current Password
                </label>
                <Input
                  type={showCurrent ? "text" : "password"}
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="bg-white/10 text-black placeholder-black/40 border border-white/20 focus:border-teal-400/40 w-full pr-10"
                  required
                />
                <div
                  className="absolute right-3 top-10.5 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowCurrent(!showCurrent)}
                >
                  <PiEyesLight size={20} />
                </div>
              </div>

              {/* New Password */}
              <div className="relative">
                <label className="block text-sm font-medium mb-1">
                  New Password
                </label>
                <Input
                  type={showNew ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-white/10 text-black placeholder-black/40 border border-white/20 focus:border-teal-400/40 w-full pr-10"
                  required
                />
                <div
                  className="absolute right-3 top-10.5 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowNew(!showNew)}
                >
                  <PiEyesLight size={20} />
                </div>
              </div>

              {/* Confirm Password (frontend only) */}
              <div className="relative">
                <label className="block text-sm font-medium mb-1">
                  Confirm Password
                </label>
                <Input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-white/10 text-black placeholder-black/40 border border-white/20 focus:border-teal-400/40 w-full pr-10"
                  required
                />
                <div
                  className="absolute right-3 top-10.5 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  <PiEyesLight size={20} />
                </div>
              </div>

              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}

              <Button
                type="submit"
                disabled={loading}
                className="bg-white/20 text-black border border-teal-400/20 backdrop-blur-lg hover:bg-white/30 hover:shadow-[0_4px_12px_rgba(0,128,128,0.3)] transition mt-2"
              >
                {loading ? "Saving..." : "Save Password"}
              </Button>
            </div>

            <div></div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}