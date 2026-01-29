"use client";

import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import TruckList from "@/components/TruckList/TruckList";
import { fetchCampers } from "@/lib/api";
import { CamperListItem, FilterProps } from "@/types/trucks";
import { useCallback, useEffect, useState } from "react";

const LIMIT = 4;

export default function Catalog() {
  const [filters, setFilters] = useState<FilterProps>({
    location: "",
    equipment: [],
    type: null,
  });

  const [trucks, setTrucks] = useState<CamperListItem[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const onFiltersSubmit = (newFilters: FilterProps) => {
    setFilters(newFilters);
  };

  const buildParams = useCallback(
    (pageNum: number) => {
      const equipParams = Object.fromEntries(
        filters.equipment
          .filter((name) => name !== "Automatic")
          .map((name) => [name, true]),
      );

      const transmissionParam = filters.equipment.includes("Automatic")
        ? { transmission: "automatic" }
        : {};

      return {
        page: pageNum,
        limit: LIMIT,
        location: filters.location || undefined,
        form: filters.type || undefined,
        ...equipParams,
        ...transmissionParam,
      };
    },
    [filters],
  );

  useEffect(() => {
    const loadFirstPage = async () => {
      setLoading(true);
      try {
        setTrucks([]);
        setPage(1);
        setTotal(null);

        const response = await fetchCampers(buildParams(1));
        setTrucks(response.items);
        setTotal(response.total);
      } catch (err) {

      } finally {
        setLoading(false);
      }
    };

    loadFirstPage();
  }, [buildParams]);

  const handleLoadMore = async () => {
    if (loading) return;

    const nextPage = page + 1;
    setLoading(true);

    try {
      const response = await fetchCampers(buildParams(nextPage));

      setTrucks((prev) => {
        const existing = new Set(prev.map((t) => t.id));
        return [...prev, ...response.items.filter((t) => !existing.has(t.id))];
      });

      setPage(nextPage);
      setTotal(response.total);
    } catch (err) {

    } finally {
      setLoading(false);
    }
  };

  const hasMore = total === null ? true : trucks.length < total;

  return (
    <section className={styles.container}>
      <h1 className={styles.disable}>Truck Catalog</h1>

      <aside>
        <Sidebar onSubmit={onFiltersSubmit} loading={loading}/>
      </aside>
      <div>
        {!loading && trucks.length === 0 && "No results found"}
        <TruckList
          trucks={trucks}
          onLoadMore={handleLoadMore}
          showLoadMore={hasMore}
          loading={loading}
        />
      </div>
    </section>
  );
}
