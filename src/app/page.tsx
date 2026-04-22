"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TopBar } from "@/components/TopBar";
import { Landing } from "@/components/Landing";
import { Dashboard } from "@/components/Dashboard";
import { Studio, type AppStep, type Conditions } from "@/components/Studio";
import { Result } from "@/components/Result";
import { Gallery } from "@/components/Gallery";
import { Pricing } from "@/components/Pricing";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import type { ParcelId, Project } from "@/lib/data";

type View = "landing" | "dashboard" | "gallery" | "pricing" | "app" | "result";

const STORE_KEY = "uprize-studio-state";

const DEFAULT_CONDITIONS: Conditions = {
  use: "오피스",
  floors: 15,
  style: "Minimal",
  far: 450,
  budget: 120,
};

export default function Home() {
  const [view, setView] = useState<View>("landing");
  const [selected, setSelected] = useState<ParcelId | null>(null);
  const [step, setStep] = useState<AppStep>("map");
  const [conditions, setConditions] = useState<Conditions>(DEFAULT_CONDITIONS);
  const [toastMsg, setToastMsg] = useState<string>("");
  const [toastShow, setToastShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Restore state from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
      if (saved) {
        if (saved.view) setView(saved.view);
        if (saved.selectedParcel) setSelected(saved.selectedParcel);
        if (saved.appStep) setStep(saved.appStep);
        if (saved.conditions) setConditions({ ...DEFAULT_CONDITIONS, ...saved.conditions });
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(
        STORE_KEY,
        JSON.stringify({
          view,
          selectedParcel: selected,
          appStep: step,
          conditions,
        })
      );
    } catch {
      /* ignore */
    }
  }, [view, selected, step, conditions]);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastShow(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastShow(false), 1800);
  }, []);

  const goto = useCallback((v: View) => {
    setView(v);
    if (v === "app") {
      setStep((s) => (s === "map" || s === "detail" || s === "conditions" ? s : "map"));
    }
    window.scrollTo({ top: 0 });
  }, []);

  const startGen = useCallback(() => {
    setLoading(true);
    setProgress(0);
    const start = Date.now();
    const dur = 2800;
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / dur) * 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setLoading(false);
          goto("result");
        }, 350);
      }
    }, 30);
  }, [goto]);

  const openProject = useCallback(
    (pr: Project) => {
      setSelected(pr.parcel);
      setConditions((c) => ({ ...c, use: pr.use, floors: pr.floors, style: pr.style }));
      if (pr.status === "done") {
        goto("result");
      } else {
        setStep("conditions");
        goto("app");
      }
    },
    [goto]
  );

  return (
    <>
      <TopBar view={view} goto={goto} toast={toast} />

      {view === "landing" && <Landing goto={goto} />}
      {view === "dashboard" && (
        <Dashboard goto={goto} toast={toast} openProject={openProject} />
      )}
      {view === "app" && (
        <Studio
          selected={selected}
          step={step}
          conditions={conditions}
          setSelected={setSelected}
          setStep={setStep}
          setConditions={setConditions}
          startGen={startGen}
        />
      )}
      {view === "result" && (
        <Result
          selected={selected ?? ("p2" as ParcelId)}
          conditions={conditions}
          goto={goto}
          toast={toast}
        />
      )}
      {view === "gallery" && <Gallery toast={toast} />}
      {view === "pricing" && <Pricing toast={toast} />}

      <LoadingOverlay show={loading} progress={progress} />

      <div
        className={`toast ${toastShow ? "show" : ""}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="accent">UPRIZE</span>
        <span>{toastMsg}</span>
      </div>
    </>
  );
}

