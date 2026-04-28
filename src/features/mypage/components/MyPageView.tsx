"use client";

import { useState } from "react";

import { MyPageHero } from "./MyPageHero";
import { MyPageTabs } from "./MyPageTabs";
import { OverviewTab } from "./tabs/OverviewTab";
import { PlanTab } from "./tabs/PlanTab";
import { UsageTab } from "./tabs/UsageTab";
import { BillingTab } from "./tabs/BillingTab";
import { AccountTab } from "./tabs/AccountTab";

import type { MyPageTabId } from "../types/mypage.types";

export const MyPageView = () => {
  const [tab, setTab] = useState<MyPageTabId>("overview");

  const handleTabChange = (next: MyPageTabId) => {
    setTab(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <MyPageHero />
      <MyPageTabs active={tab} onChange={handleTabChange} />

      <section className="py-14">
        <div className="mx-auto max-w-[1280px] px-8">
          <div key={tab} className="animate-fade-up">
            {tab === "overview" ? (
              <OverviewTab onUpgrade={() => handleTabChange("plan")} />
            ) : null}
            {tab === "plan" ? <PlanTab /> : null}
            {tab === "usage" ? <UsageTab /> : null}
            {tab === "billing" ? <BillingTab /> : null}
            {tab === "account" ? <AccountTab /> : null}
          </div>
        </div>
      </section>
    </>
  );
};
