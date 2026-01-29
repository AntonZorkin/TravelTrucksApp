"use client";

import Icon from "@/components/Icon/Icon";
import styles from "./FeaturesList.module.css";
import { CamperListItem } from "@/types/trucks";

type Props = {
  truck: CamperListItem;
  limit?: number;
};

const LABELS: Record<string, string> = {
  automatic: "Automatic",
  manual: "Manual",
  diesel: "Diesel",
  petrol: "Petrol",
  hybrid: "Hybrid",
  AC: "AC",
  kitchen: "Kitchen",
  bathroom: "Bathroom",
  TV: "TV",
  radio: "Radio",
  refrigerator: "Refrigerator",
  microwave: "Microwave",
  gas: "Gas",
  water: "Water",
};

export default function FeaturesList({ truck, limit = 7 }: Props) {
  const features = [
    truck.transmission && { label: truck.transmission, icon: "diagram" },
    truck.engine && { label: truck.engine, icon: "fuel-pump" },
    truck.AC && { label: "AC", icon: "wind" },
    truck.bathroom && { label: "bathroom", icon: "shower" },
    truck.kitchen && { label: "kitchen", icon: "cup-hot" },
    truck.TV && { label: "TV", icon: "tv" },
    truck.radio && { label: "radio", icon: "radios" },
    truck.refrigerator && { label: "refrigerator", icon: "fridge" },
    truck.microwave && { label: "microwave", icon: "microwave" },
    truck.gas && { label: "gas", icon: "gas" },
    truck.water && { label: "water", icon: "water" },
  ]
    .filter(Boolean)
    .slice(0, limit) as { label: string; icon: string }[];

  return (
    <div className={styles.details}>
      {features.map((f, idx) => (
        <div key={`${f.icon}-${f.label}-${idx}`} className={styles.comfort}>
          <Icon name={f.icon} size={20} />
          <p>{LABELS[f.label] ?? f.label}</p>
        </div>
      ))}
    </div>
  );
}
