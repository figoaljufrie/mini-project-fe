"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { PiEyesLight } from "react-icons/pi";

export default function UserPasswordPage() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Password updated successfully!");
  };

  return (
    <div className="p-8">
      <Card className="bg-white/10 backdrop-blur-lg shadow-lg border border-white/20 rounded-2xl p-8 max-w-full">
        <CardContent>
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Change Password</h2>
            <Button className="bg-white/20 backdrop-blur-lg border border-white/30 text-white">
              Save Changes
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Left Section: Password Form */}
            <div className="space-y-6 text-white">
              {/* Current Password */}
              <div className="relative">
                <label className="block text-sm font-medium mb-1">Current Password</label>
                <Input
                  type={showCurrent ? "text" : "password"}
                  placeholder="Enter current password"
                  className="bg-white/20 text-white placeholder-white/70 pr-10"
                  required
                />
                <div
                  className="absolute right-3 top-10.5 -translate-y-1/2 text-white cursor-pointer"
                  onClick={() => setShowCurrent(!showCurrent)}
                >
                  <PiEyesLight className="text-white" size={20} />
                </div>
              </div>

              {/* New Password */}
              <div className="relative">
                <label className="block text-sm font-medium mb-1">New Password</label>
                <Input
                  type={showNew ? "text" : "password"}
                  placeholder="Enter new password"
                  className="bg-white/20 text-white placeholder-white/70 pr-10"
                  required
                />
                <div
                  className="absolute right-3 top-10.5 -translate-y-1/2 text-white cursor-pointer"
                  onClick={() => setShowNew(!showNew)}
                >
                  <PiEyesLight className="text-white" size={20} />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <Input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm new password"
                  className="bg-white/20 text-white placeholder-white/70 pr-10"
                  required
                />
                <div
                  className="absolute right-3 top-10.5 -translate-y-1/2 text-white cursor-pointer"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  <PiEyesLight className="text-white" size={20} />
                </div>
              </div>

              <Button
                className="bg-white/20 text-white border border-white/30 mt-2"
                onClick={handleSave}
              >
                Save Password
              </Button>
            </div>

            {/* Right Section: Empty for alignment */}
            <div></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}