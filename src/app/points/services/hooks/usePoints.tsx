// hooks/usePoints.ts
import { useState, useEffect } from "react";
import { getUserPoints } from "../services/pointsService";

export function usePoints() {
  const [points, setPoints] = useState<number>(0);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all([getUserPoints()])
      .then(([p]) => {
        if (isMounted) {
          setPoints(p);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch points or transactions:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { points, transactions, loading };
}
