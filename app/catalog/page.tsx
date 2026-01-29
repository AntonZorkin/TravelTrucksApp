"use client";

import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import TruckList from "@/components/TruckList/TruckList";
import { fetchCampers } from "@/lib/api";
import { CamperListItem, FilterProps } from "@/types/trucks";
import { useEffect, useState } from "react";

const equipmentMap: Record<string, string> = {
  AC: "AC",
  TV: "TV",
  Kitchen: "kitchen",
  Bathroom: "bathroom",
};

export default function Catalog() {
  const [filters, setFilters] = useState<FilterProps>({
    location: "",
    equipment: [],
    type: null,
  });

  const onFiltersSubmit = (newFilters: FilterProps) => {
    setFilters(newFilters);
  };

  const [trucks, setTrucks] = useState<CamperListItem[]>([]);
  useEffect(() => {
    const loadTrucks = async () => {
      const equipParams = Object.fromEntries(
        filters.equipment
          .filter((name) => name !== "Automatic")
          .map((name) => equipmentMap[name])
          .filter(Boolean)
          .map((apiKey) => [apiKey, true]),
      );

      const transmissionParam = filters.equipment.includes("Automatic")
        ? { transmission: "automatic" }
        : {};
      const params = {
        page: 1,
        limit: 4,
        location: filters.location || undefined,
        form: filters.type || undefined,
        ...equipParams,
        ...transmissionParam,
      };
      console.log("REQUEST PARAMS:", params);
      try {
        const response = await fetchCampers(params);
        setTrucks(response.items);
      } catch (err) {
        console.error("FETCH ERROR:", err);
      }


    };

    loadTrucks();
  }, [filters]);
  return (
    <section className={styles.container}>
      <h1 className={styles.disable}>Truck Catalog</h1>
      <aside>{<Sidebar onSubmit={onFiltersSubmit} />}</aside>
      <div>
        <TruckList trucks={trucks} />
      </div>
    </section>
  );
}
