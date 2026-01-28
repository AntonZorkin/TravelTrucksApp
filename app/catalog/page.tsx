"use client";

import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import TruckList from "@/components/TruckList/TruckList";
import { fetchCampers } from "@/lib/api";
import { CamperListItem, FilterProps } from "@/types/trucks";
import { useEffect, useState } from "react";

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
        filters.equipment.map((name) => [name, true]),
      );

      const response = await fetchCampers({
        page: 1,
        limit: 4,
        search: filters.location || undefined,
        form: filters.type || undefined,
        ...equipParams,
      });

      setTrucks(response.items);
    };

    loadTrucks();
  }, [filters]);
  return (
    <section className={styles.container}>
      {/* <h1 className={styles.disable}>Truck Catalog</h1> */}
      <aside>{<Sidebar onSubmit={onFiltersSubmit} />}</aside>
          <div>

        <TruckList trucks={trucks} />
      </div>
    </section>
  );
}
