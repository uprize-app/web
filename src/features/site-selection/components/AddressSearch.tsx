"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { useAddressSearch } from "../hooks/useAddressSearch";

type Props = {
  /** 초기 입력값 (선택된 필지 주소 등) */
  defaultValue?: string;
  /** 자동완성 항목 클릭 시 호출 */
  onPick: (params: {
    placeName: string;
    address: string;
    roadAddress: string;
    lat: number;
    lng: number;
  }) => void;
  className?: string;
};

export const AddressSearch = ({ defaultValue = "", onPick, className }: Props) => {
  const [query, setQuery] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const search = useAddressSearch(query);

  // outside click → close dropdown
  useEffect(() => {
    if (!isOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [isOpen]);

  const showDropdown =
    isOpen && query.trim().length > 0 && search.status !== "idle";

  return (
    <div ref={wrapperRef} className={cn("relative", className)}>
      <Search
        size={16}
        strokeWidth={1.4}
        className="pointer-events-none absolute left-[18px] top-1/2 -translate-y-1/2 text-ink-50"
      />
      <Input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder="주소·지번을 검색하세요 (예: 서울 강남구 역삼동 123-4)"
        className="h-12 pl-12 shadow-soft"
        aria-autocomplete="list"
        aria-expanded={showDropdown}
      />

      {showDropdown ? (
        <div
          role="listbox"
          className="absolute inset-x-0 top-[calc(100%+8px)] z-20 max-h-[320px] overflow-y-auto rounded-md border border-line bg-white shadow-lift"
        >
          {search.status === "loading" && search.results.length === 0 ? (
            <div className="px-4 py-4 font-mono text-[11px] tracking-[0.12em] text-ink-50">
              SEARCHING…
            </div>
          ) : null}

          {search.status === "ready" && search.results.length === 0 ? (
            <div className="px-4 py-4 text-[13px] text-ink-50">
              검색 결과가 없습니다.
            </div>
          ) : null}

          {search.status === "error" ? (
            <div className="px-4 py-4 text-[13px] text-ink-50">
              검색에 실패했습니다. 다시 시도해주세요.
            </div>
          ) : null}

          {search.results.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                onPick({
                  placeName: p.place_name,
                  address: p.address_name,
                  roadAddress: p.road_address_name,
                  lat: Number(p.y),
                  lng: Number(p.x),
                });
                setQuery(p.address_name || p.place_name);
                setIsOpen(false);
              }}
              className="block w-full border-b border-line px-4 py-3 text-left text-[13px] transition-colors last:border-0 hover:bg-paper"
            >
              <div className="font-medium text-ink">{p.place_name}</div>
              <div className="mt-0.5 text-[12px] text-ink-50">
                {p.road_address_name || p.address_name}
              </div>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};
