"use client";

import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import TruckList from "@/components/TruckList/TruckList";
import { useFiltersStore } from "@/store/filters";
import { useCampersStore } from "@/store/campers";
import { FilterProps } from "@/types/trucks";
import { useEffect } from "react";

export default function Catalog() {
  const { setFilters } = useFiltersStore();

  const { trucks, total, loading, loadFirstPage, loadMore } = useCampersStore();

  const onFiltersSubmit = (newFilters: FilterProps) => {
    setFilters(newFilters);
    loadFirstPage();
  };

  useEffect(() => {
    loadFirstPage();
  }, [loadFirstPage]);

  const hasMore = total === null ? true : trucks.length < total;
  const showLoadMore = trucks.length > 0 && hasMore;

  return (
    <section className={styles.container}>
      <h1 className={styles.disable}>Truck Catalog</h1>

      <aside>
        <Sidebar onSubmit={onFiltersSubmit} loading={loading} />
      </aside>

      <div>
        {!loading && trucks.length === 0 && (
          <div className={styles.noResults}>No results found</div>
        )}

        <TruckList
          trucks={trucks}
          onLoadMore={loadMore}
          showLoadMore={showLoadMore}
          loading={loading}
        />
      </div>
    </section>
  );
}
