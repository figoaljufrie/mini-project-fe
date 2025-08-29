import InformationCard from "./information-card";
import { Ticket, ShieldCheck, Smartphone } from "lucide-react";

const infos = [
  {
    id: 1,
    title: "Easy Ticket Purchase",
    description: "Beli tiket event favoritmu hanya dalam beberapa klik.",
    icon: <Ticket className="w-10 h-10" />,
  },
  {
    id: 2,
    title: "Secure Payment",
    description: "Transaksi aman dengan berbagai metode pembayaran.",
    icon: <ShieldCheck className="w-10 h-10" />,
  },
  {
    id: 3,
    title: "Mobile Friendly",
    description: "Akses tiket langsung dari smartphone tanpa ribet.",
    icon: <Smartphone className="w-10 h-10" />,
  },
];

export default function InformationSection() {
  return (
    <section className="info-section">
      <h2 className="info-section-title">Why Choose Us?</h2>
      <div className="info-section-grid">
        {infos.map((info) => (
          <InformationCard
            key={info.id}
            icon={info.icon}
            title={info.title}
            description={info.description}
          />
        ))}
      </div>
    </section>
  );
}