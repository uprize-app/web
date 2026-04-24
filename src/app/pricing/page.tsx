"use client";

import { Pricing } from "@/components/Pricing";

const noopToast = (message: string) => {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.info("[toast]", message);
  }
};

const PricingPage = () => <Pricing toast={noopToast} />;

export default PricingPage;
