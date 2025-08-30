"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <Card className="backdrop-blur-xl bg-gradient-to-br from-teal-400/30 via-teal-500/30 to-teal-600/30 border border-teal-700/40 rounded-2xl shadow-[0_10px_25px_rgba(0,128,128,0.4)] hover:shadow-[0_15px_35px_rgba(0,128,128,0.6)] transition-all duration-300">
        <CardContent className="p-8 space-y-10">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-teal-700/40 pb-4">
            <h2 className="text-2xl font-bold text-black">Organizer Profile</h2>
            <Button className="bg-gradient-to-r from-teal-400 to-teal-600 text-white font-medium rounded-xl px-6 py-2 shadow-[0_5px_15px_rgba(0,128,128,0.5)] transition-transform duration-300 hover:scale-105">
              Save Changes
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left Section: Profile Info */}
            <div className="space-y-6 text-black">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  defaultValue="John Doe"
                  className="bg-white/50 border border-teal-700/40 text-black placeholder-black/50 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <Input
                  defaultValue="johndoe123"
                  className="bg-white/50 border border-teal-700/40 text-black placeholder-black/50 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  defaultValue="johndoe@email.com"
                  disabled
                  className="bg-white/30 border border-teal-700/40 text-black/70 rounded-lg cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <Input
                  defaultValue="ORGANIZER"
                  disabled
                  className="bg-white/30 border border-teal-700/40 text-black/70 rounded-lg cursor-not-allowed"
                />
              </div>
            </div>

            {/* Right Section: Profile Picture */}
            <div className="flex flex-col items-center space-y-6">
              <Avatar className="h-32 w-32 border-4 border-teal-700 shadow-[0_5px_20px_rgba(0,128,128,0.5)]">
                <AvatarImage src="/placeholder-avatar.png" alt="Profile" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                className="bg-white/40 text-black border border-teal-700/40 rounded-xl px-4 py-2 shadow-[0_5px_15px_rgba(0,128,128,0.4)] transition-transform duration-300 hover:scale-105 hover:bg-teal-500/20"
              >
                Upload New Picture
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}