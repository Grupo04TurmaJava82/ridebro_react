import React from "react";

interface BenefitItemProps {
  number: string;
  title: string;
  description: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export function BenefitItem({ number, title, description, Icon }: BenefitItemProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "2rem", gap: "2rem" }}>
      <div>
        <h2 style={{ fontSize: "1.5rem", color: "var(--primary-blue)" }}>
          {number}. {title}
        </h2>
        <p>{description}</p>
      </div>
      <Icon width={140} height={140} />
    </div>
  );
}
