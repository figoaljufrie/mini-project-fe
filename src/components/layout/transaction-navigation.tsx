"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface TransactionNavigationProps {
  eventSlug: string;
  qtyA: number;
  qtyB: number;
  total: number;
  method?: string;
  bank?: string;
  status?: string;
  currentStep: 'checkout' | 'payment' | 'upload-proof' | 'payment-status' | 'download-tickets';
}

export default function TransactionNavigation({
  eventSlug,
  qtyA,
  qtyB,
  total,
  method,
  bank,
  status,
  currentStep
}: TransactionNavigationProps) {
  const pathname = usePathname();

  const steps = [
    {
      key: 'checkout',
      title: 'Checkout',
      path: `/transactions/checkout?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}`,
      icon: '🛒',
      description: 'Pilih tiket & data diri'
    },
    {
      key: 'payment',
      title: 'Payment',
      path: `/transactions/payment?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}&total=${total}`,
      icon: '💳',
      description: 'Pilih metode pembayaran'
    },
    {
      key: 'upload-proof',
      title: 'Upload Proof',
      path: `/transactions/upload-proof?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}&total=${total}&method=${method || 'unknown'}${bank ? `&bank=${bank}` : ''}`,
      icon: '📤',
      description: 'Upload bukti pembayaran'
    },
    {
      key: 'payment-status',
      title: 'Status',
      path: `/transactions/payment-status?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}&total=${total}&method=${method || 'unknown'}${bank ? `&bank=${bank}` : ''}&status=${status || 'waiting'}`,
      icon: '📊',
      description: 'Status pembayaran'
    },
    {
      key: 'download-tickets',
      title: 'Tickets',
      path: `/transactions/download-tickets?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}&total=${total}`,
      icon: '🎫',
      description: 'Download tiket'
    }
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.key === currentStep);
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="relative">
        <div className="flex justify-between items-center relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
          
          {steps.map((step, index) => {
            const isActive = step.key === currentStep;
            const isCompleted = index < currentStepIndex;
            const isAccessible = index <= currentStepIndex + 1; // Allow going to next step
            
            return (
              <div key={step.key} className="flex flex-col items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all duration-300
                  ${isActive 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' 
                    : isCompleted 
                    ? 'bg-green-500 text-white' 
                    : isAccessible
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                  }
                `}>
                  {isCompleted ? '✓' : step.icon}
                </div>
                <span className={`
                  text-sm font-medium transition-colors
                  ${isActive 
                    ? 'text-purple-600' 
                    : isCompleted 
                    ? 'text-green-600' 
                    : isAccessible
                    ? 'text-blue-600'
                    : 'text-gray-500'
                  }
                `}>
                  {step.title}
                </span>
                <span className="text-xs text-gray-400 text-center mt-1 max-w-20">
                  {step.description}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {steps.map((step, index) => {
          const isActive = step.key === currentStep;
          const isCompleted = index < currentStepIndex;
          const isAccessible = index <= currentStepIndex + 1;
          
          if (isActive) {
            return (
              <span
                key={step.key}
                className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium cursor-default"
              >
                {step.title} (Aktif)
              </span>
            );
          }
          
          if (isAccessible) {
            return (
              <Link
                key={step.key}
                href={step.path}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105
                  ${isCompleted 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }
                `}
              >
                {isCompleted ? '✓ ' : ''}{step.title}
              </Link>
            );
          }
          
          return (
            <span
              key={step.key}
              className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg font-medium cursor-not-allowed"
            >
              {step.title}
            </span>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        <Link
          href={`/events/${eventSlug}`}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          📋 Detail Event
        </Link>
        
        <Link
          href="/event-browsing"
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          🔍 Browse Events
        </Link>
        
        <Link
          href="/my-transactions"
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          📊 My Transactions
        </Link>
        
        <Link
          href="/reviews"
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          ⭐ Reviews
        </Link>
      </div>
    </div>
  );
}