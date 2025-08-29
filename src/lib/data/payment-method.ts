// Data metode pembayaran yang konsisten di seluruh aplikasi

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
  fee: number;
  processingTime: string;
  isPopular?: boolean;
  category: "e-wallet" | "bank-transfer" | "qris";
}

export interface BankOption {
  id: string;
  name: string;
  logo: string;
  accountNumber: string;
  accountName: string;
  bankCode?: string;
}

// Metode pembayaran utama
export const paymentMethods: PaymentMethod[] = [
  {
    id: "qris",
    name: "QRIS",
    icon: "📱",
    description: "Scan QR code dengan aplikasi e-wallet atau mobile banking",
    fee: 0,
    processingTime: "Instan",
    isPopular: true,
    category: "qris",
  },
  {
    id: "gopay",
    name: "GoPay",
    icon: "🟢",
    description: "Pembayaran melalui aplikasi Gojek",
    fee: 0,
    processingTime: "Instan",
    category: "e-wallet",
  },
  {
    id: "shopeepay",
    name: "ShopeePay",
    icon: "🟠",
    description: "Pembayaran melalui aplikasi Shopee",
    fee: 0,
    processingTime: "Instan",
    category: "e-wallet",
  },
  {
    id: "ovo",
    name: "OVO",
    icon: "🟣",
    description: "Pembayaran melalui aplikasi OVO",
    fee: 0,
    processingTime: "Instan",
    category: "e-wallet",
  },
  {
    id: "dana",
    name: "DANA",
    icon: "🔵",
    description: "Pembayaran melalui aplikasi DANA",
    fee: 0,
    processingTime: "Instan",
    category: "e-wallet",
  },
  {
    id: "bank-transfer",
    name: "Bank Transfer",
    icon: "🏦",
    description: "Transfer manual ke rekening bank",
    fee: 0,
    processingTime: "1-2 jam",
    category: "bank-transfer",
  },
];

// Opsi bank untuk transfer
export const bankOptions: BankOption[] = [
  {
    id: "bca",
    name: "Bank BCA",
    logo: "🏦",
    accountNumber: "1234567890",
    accountName: "PT EVENTFINDER INDONESIA",
    bankCode: "014",
  },
  {
    id: "mandiri",
    name: "Bank Mandiri",
    logo: "🏦",
    accountNumber: "0987654321",
    accountName: "PT EVENTFINDER INDONESIA",
    bankCode: "008",
  },
  {
    id: "bni",
    name: "Bank BNI",
    logo: "🏦",
    accountNumber: "1122334455",
    accountName: "PT EVENTFINDER INDONESIA",
    bankCode: "009",
  },
  {
    id: "bri",
    name: "Bank BRI",
    logo: "🏦",
    accountNumber: "5544332211",
    accountName: "PT EVENTFINDER INDONESIA",
    bankCode: "002",
  },
];

// Fungsi helper untuk mendapatkan metode pembayaran berdasarkan kategori
export function getPaymentMethodsByCategory(
  category: PaymentMethod["category"]
): PaymentMethod[] {
  return paymentMethods.filter((method) => method.category === category);
}

// Fungsi helper untuk mendapatkan metode pembayaran populer
export function getPopularPaymentMethods(): PaymentMethod[] {
  return paymentMethods.filter((method) => method.isPopular);
}

// Fungsi helper untuk mendapatkan bank berdasarkan ID
export function getBankById(id: string): BankOption | undefined {
  return bankOptions.find((bank) => bank.id === id);
}

// Fungsi helper untuk mendapatkan semua bank
export function getAllBanks(): BankOption[] {
  return bankOptions;
}
