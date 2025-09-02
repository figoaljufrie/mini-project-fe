"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { couponService } from "@/app/dashboard/services/couponService";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

type Props = {
  refresh: () => void;
};

export default function CreateCouponModal({ refresh }: Props) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState<string>(""); // empty string instead of 0
  const [quantity, setQuantity] = useState<string>(""); // empty string instead of 0
  const [expiresAt, setExpiresAt] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await couponService.createOrganizerCoupon({
        code,
        discountIdr: discount ? Number(discount) : 0,
        quantity: quantity ? Number(quantity) : 0,
        expiresAt: expiresAt ? expiresAt.toISOString() : undefined,
      });

      // reset form
      setOpen(false);
      setCode("");
      setDiscount("");
      setQuantity("");
      setExpiresAt(undefined);
      refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        className="bg-teal-400/20 text-black border border-teal-400/20 backdrop-blur-lg hover:bg-white/30 hover:shadow-[0_4px_12px_rgba(0,128,128,0.3)] transition"
        onClick={() => setOpen(true)}
      >
        + Create Coupon
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        {/* Custom overlay instead of overlayClass */}
        <DialogOverlay className="backdrop-blur-lg bg-black/10 fixed inset-0" />

        <DialogContent className="backdrop-blur-lg bg-white/60 border border-white/20 shadow-xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Create Organizer Coupon
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 text-gray-900">
            {/* Code */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Coupon Code
              </label>
              <Input
                placeholder="e.g. SAVE20"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="bg-white/60 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-stone-500"
              />
            </div>

            {/* Discount */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Discount (IDR)
              </label>
              <Input
                type="number"
                placeholder="e.g. 50000"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="bg-white/60 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-stone-500"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <Input
                type="number"
                placeholder="e.g. 100"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="bg-white/60 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-stone-500"
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Expiration Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-white/60 border border-gray-300 text-gray-900 rounded-lg hover:bg-white/80"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {expiresAt ? (
                      format(expiresAt, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white/80 border border-gray-200 rounded-lg shadow-md">
                  <Calendar
                    mode="single"
                    selected={expiresAt}
                    onSelect={setExpiresAt}
                    initialFocus
                    className="p-4 w-[350px] rounded-lg bg-white/20 text-black"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Save Button */}
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-teal-600/50 text-white font-medium rounded-xl px-6 py-2 shadow-md hover:bg-gray-700 transition-colors"
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}