import { useEffect, useState } from "react";

type DashboardStats = {
  newSuggestions: number;
  liked: number;
  awaitingResponse: number;
};

const defaultStats: DashboardStats = {
  newSuggestions: 0,
  liked: 0,
  awaitingResponse: 0,
};

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats>(defaultStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await fetch("/api/dashboard/stats");

        if (!response.ok) {
          throw new Error("Kunne ikke hente dashboard-statistikk");
        }

        const data: DashboardStats = await response.json();
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return { stats, loading };
};