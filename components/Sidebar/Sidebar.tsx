"use client";

import { useState } from "react";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import styles from "./Sidebar.module.css";
import { FilterProps } from "@/types/trucks";

interface SidebarProps {
  onSubmit: (filters: FilterProps) => void;
}

export default function Sidebar({ onSubmit }: SidebarProps) {
  const [activeEquip, setActiveEquip] = useState<string[]>([]);
  const toggleEquip = (name: string) => {
    setActiveEquip((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name],
    );
  };

  const [vehicleType, setVehicleType] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const selectVehicleType = (type: string) => {
    setVehicleType((prev) => (prev === type ? null : type));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filters = {
      location,
      equipment: activeEquip,
      type: vehicleType,
    };
    onSubmit(filters);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className={styles.location}>
          <p className={styles.locationText}>Location</p>
          <div className={styles.input}>
            <Icon name="map" size={20} />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.filters}>
          <p className={styles.filtersText}>Filters</p>
          <div className={styles.vehicleEquip}>
            <h2 className={styles.vehicleText}>Vehicle equipment</h2>
            <div className={styles.equipList}>
              <button
                type="button"
                className={`${styles.equipItem} ${activeEquip.includes("AC") ? styles.active : ""}`}
                onClick={() => toggleEquip("AC")}
              >
                <Icon name="wind" size={32} />
                <p className={styles.equipText}>AC</p>
              </button>
              <button
                type="button"
                className={`${styles.equipItem} ${activeEquip.includes("Automatic") ? styles.active : ""}`}
                onClick={() => toggleEquip("Automatic")}
              >
                <Icon name="diagram" size={32} />
                <p className={styles.equipText}>Automatic</p>
              </button>
              <button
                type="button"
                className={`${styles.equipItem} ${activeEquip.includes("Kitchen") ? styles.active : ""}`}
                onClick={() => toggleEquip("Kitchen")}
              >
                <Icon name="cup-hot" size={32} />
                <p className={styles.equipText}>Kitchen</p>
              </button>
              <button
                type="button"
                className={`${styles.equipItem} ${activeEquip.includes("TV") ? styles.active : ""}`}
                onClick={() => toggleEquip("TV")}
              >
                <Icon name="tv" size={32} />
                <p className={styles.equipText}>TV</p>
              </button>
              <button
                type="button"
                className={`${styles.equipItem} ${activeEquip.includes("Bathroom") ? styles.active : ""}`}
                onClick={() => toggleEquip("Bathroom")}
              >
                <Icon name="shower" size={32} />
                <p className={styles.equipText}>Bathroom</p>
              </button>
            </div>
          </div>

          <div className={styles.vehicleType}>
            <h2 className={styles.vehicleText}>Vehicle type</h2>
            <div className={styles.typeList}>
              <button
                type="button"
                className={`${styles.typeItem} ${vehicleType === "van" ? styles.active : ""}`}
                onClick={() => selectVehicleType("van")}
              >
                <Icon name="three-windows" size={32} />
                <p className={styles.equipText}>Van</p>
              </button>
              <button
                type="button"
                className={`${styles.typeItem} ${
                  vehicleType === "fully" ? styles.active : ""
                }`}
                onClick={() => selectVehicleType("fully")}
              >
                <Icon name="four-windows" size={32} />
                <p className={styles.equipText}>Fully Integrated</p>
              </button>
              <button
                type="button"
                className={`${styles.typeItem} ${
                  vehicleType === "alcove" ? styles.active : ""
                }`}
                onClick={() => selectVehicleType("alcove")}
              >
                <Icon name="nine-windows" size={32} />
                <p className={styles.equipText}>Alcove</p>
              </button>
            </div>
          </div>
        </div>

        <Button>Search</Button>
      </form>
    </section>
  );
}
