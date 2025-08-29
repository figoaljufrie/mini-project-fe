import { ReactNode } from "react";

interface InformationCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function InformationCard({ icon, title, description }: InformationCardProps) {
  return (
    <div className="info-card">
      <div className="info-card-icon">{icon}</div>
      <h3 className="info-card-title">{title}</h3>
      <p className="info-card-description">{description}</p>
    </div>
  );
}