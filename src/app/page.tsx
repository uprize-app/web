"use client";

import { useRouter } from "next/navigation";
import { Landing } from "@/components/Landing";

const LANDING_ROUTE_MAP = {
  app: "/studio/new",
  gallery: "/gallery",
  result: "/dashboard",
} as const;

const HomePage = () => {
  const router = useRouter();

  const handleGoto = (v: keyof typeof LANDING_ROUTE_MAP) => {
    router.push(LANDING_ROUTE_MAP[v]);
  };

  return <Landing goto={handleGoto} />;
};

export default HomePage;
