"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/app/auth/store/auth-store";
import { getMe, updateProfile } from "@/app/auth/services/auth/authService";
import { useAvatar } from "@/app/auth/hooks/use-avatar";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function OrganizerProfilePage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { hydrated, user, setUser } = useAuthStore();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const {
    uploadAvatar,
    loading: avatarLoading,
    error: avatarError,
  } = useAvatar(user?.id ?? null, setUser);

  // Fetch user if not loaded
  useEffect(() => {
    if (!user && hydrated) {
      getMe().then((u) => {
        setUser(u);
      });
    }
  }, [user, hydrated, setUser]);

  // Populate form when user is available
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name ?? "",
        username: user.username ?? "",
        email: user.email ?? "",
        role: user.role ?? "",
      });
      setLoading(false);
    }
  }, [user]);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const updatedUser = await updateProfile(user.id, {
        name: form.name,
        username: form.username,
      });
      setUser(updatedUser);
      alert("Profile updated successfully!");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Cannot update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      await uploadAvatar(e.target.files[0]);
    }
  };

  const getInitials = (name: string) =>
    name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "?";

  if (!hydrated || loading || !user) {
    return <div className="p-8 text-black">Loading profile...</div>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <Card className="backdrop-blur-xl bg-gradient-to-br from-teal-400/30 via-teal-500/30 to-teal-600/30 border border-teal-700/40 rounded-2xl shadow-[0_10px_25px_rgba(0,128,128,0.4)] hover:shadow-[0_15px_35px_rgba(0,128,128,0.6)] transition-all duration-300">
        <CardContent className="p-8 space-y-10">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-teal-700/40 pb-4">
            <h2 className="text-2xl font-bold text-black">Organizer Profile</h2>
            <Button
              onClick={handleSave}
              disabled={saving || avatarLoading}
              className="bg-gradient-to-r from-teal-400 to-teal-600 text-white font-medium rounded-xl px-6 py-2 shadow-[0_5px_15px_rgba(0,128,128,0.5)] transition-transform duration-300 hover:scale-105"
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left Section */}
            <div className="space-y-6 text-black">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="bg-white/50 border border-teal-700/40 text-black placeholder-black/50 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <Input
                  value={form.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  className="bg-white/50 border border-teal-700/40 text-black placeholder-black/50 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  value={form.email}
                  disabled
                  className="bg-white/30 border border-teal-700/40 text-black/70 rounded-lg cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <Input
                  value={form.role}
                  disabled
                  className="bg-white/30 border border-teal-700/40 text-black/70 rounded-lg cursor-not-allowed"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col items-center space-y-6">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="focus:outline-none">
                    <Avatar className="h-32 w-32 border-4 border-teal-700 shadow-[0_5px_20px_rgba(0,128,128,0.5)] cursor-pointer">
                      {user?.avatarUrl ? (
                        <AvatarImage
                          src={
                            user?.avatarUrl ||
                            `https://ui-avatars.com/api/?name=${form.name}`
                          }
                          alt={user.name || "User Avatar"}
                        />
                      ) : (
                        <AvatarFallback>
                          {getInitials(form.name)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </button>
                </DialogTrigger>
                <DialogContent className="flex justify-center items-center bg-transparent border-none shadow-none">
                  <DialogHeader>
                    <VisuallyHidden>
                      <DialogTitle>Profile Avatar Preview</DialogTitle>
                    </VisuallyHidden>
                  </DialogHeader>
                  <img
                    src={
                      user?.avatarUrl ||
                      `https://ui-avatars.com/api/?name=${form.name}`
                    }
                    alt={user.name || "User Avatar"}
                    className="max-h-[80vh] max-w-[80vw] rounded-2xl shadow-lg"
                  />
                </DialogContent>
              </Dialog>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />

              <Button
                variant="outline"
                disabled={avatarLoading}
                onClick={() => fileInputRef.current?.click()}
                className="bg-white/40 text-black border border-teal-700/40 rounded-xl px-4 py-2 shadow-[0_5px_15px_rgba(0,128,128,0.4)] transition-transform duration-300 hover:scale-105 hover:bg-teal-500/20"
              >
                {avatarLoading ? "Uploading..." : "Upload New Picture"}
              </Button>
              {avatarError && (
                <p className="text-red-500 text-sm">{avatarError}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}