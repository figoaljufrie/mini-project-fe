"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function UserProfilePage() {
  return (
    <div className="p-8">
      <Card className="bg-white/10 backdrop-blur-lg shadow-lg border border-white/20 rounded-2xl p-8">
        <CardContent>
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">User Profile</h2>
            <Button className="bg-white/20 backdrop-blur-lg border border-white/30 text-white">
              Save Changes
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Left Section: Profile Info */}
            <div className="space-y-6 text-white">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <Input
                  defaultValue="Jane Doe"
                  className="bg-white/20 text-white placeholder-white/70"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Referral Code</label>
                <Input
                  defaultValue="REF123456"
                  disabled
                  className="bg-white/20 text-white/70"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  defaultValue="janedoe@email.com"
                  disabled
                  className="bg-white/20 text-white/70"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <Input
                  defaultValue="CUSTOMER"
                  disabled
                  className="bg-white/20 text-white/70"
                />
              </div>
            </div>

            {/* Right Section: Profile Picture */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                <AvatarImage src="/placeholder-avatar.png" alt="Profile" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                className="bg-white/20 text-white border border-white/30"
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