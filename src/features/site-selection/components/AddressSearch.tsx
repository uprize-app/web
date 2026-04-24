"use client";

import { useState } from "react";
import { useAddressSearch, type AddressSearchHit } from "@/features/site-selection/hooks/useAddressSearch";

type AddressSearchProps = {
  onSelect: (hit: AddressSearchHit) => void;
  disabled?: boolean;
};

export const AddressSearch = ({ onSelect, disabled }: AddressSearchProps) => {
  const [query, setQuery] = useState("");
  const { results, isLoading, error, search, reset, lastQuery } = useAddressSearch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await search(query);
    } catch {
      /* 훅 내부에서 error 상태 관리 */
    }
  };

  const handleSelect = (hit: AddressSearchHit) => {
    onSelect(hit);
    setQuery(hit.roadAddress ?? hit.address);
    reset();
  };

  return (
    <div className="relative w-full min-w-0">
      <label className="mb-3 flex flex-wrap items-end justify-between gap-x-3 gap-y-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
          주소 검색
        </span>
        <span className="text-[11px] text-ink-decorative">Enter 또는 검색 버튼</span>
      </label>

      <form
        onSubmit={handleSubmit}
        className="flex w-full min-w-0 items-stretch overflow-hidden rounded-full border border-line bg-paper shadow-[0_10px_30px_-20px_rgba(21,20,15,0.25)] transition focus-within:border-ink focus-within:shadow-[0_14px_34px_-16px_rgba(21,20,15,0.3)]"
      >
        <span aria-hidden="true" className="flex shrink-0 items-center pl-5 text-ink-faint">
          ⌕
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="예: 서울 강남구 삼성동 159"
          className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-[15px] text-ink outline-none placeholder:text-ink-decorative"
          disabled={disabled || isLoading}
          aria-label="주소 검색 입력"
        />
        <button
          type="submit"
          disabled={disabled || isLoading || !query.trim()}
          className="m-1.5 shrink-0 rounded-full bg-ink px-5 text-sm font-semibold text-paper transition hover:bg-ink-2 disabled:cursor-not-allowed disabled:opacity-45 md:px-6"
        >
          {isLoading ? "검색 중…" : "검색"}
        </button>
      </form>

      {error ? (
        <p className="mt-3 text-xs text-red-700" role="alert">
          {error.message}
        </p>
      ) : null}

      {!isLoading && lastQuery && results.length === 0 && !error ? (
        <p className="mt-3 text-xs text-ink-soft">
          ‘{lastQuery}’ 에 해당하는 주소가 없어요. 지번 또는 도로명으로 다시 입력해 보세요.
        </p>
      ) : null}

      {results.length > 0 ? (
        <ul
          role="listbox"
          className="absolute z-20 mt-3 max-h-80 w-full overflow-y-auto rounded-3xl border border-line bg-paper shadow-[0_30px_60px_-24px_rgba(21,20,15,0.35)]"
        >
          {results.map((hit) => (
            <li key={`${hit.address}-${hit.latitude}-${hit.longitude}`}>
              <button
                type="button"
                onClick={() => handleSelect(hit)}
                className="flex w-full min-w-0 flex-col items-start gap-1 border-b border-line/70 px-5 py-4 text-left text-sm transition last:border-b-0 hover:bg-bg-2"
              >
                <span className="block w-full break-words font-medium text-ink">
                  {hit.roadAddress ?? hit.address}
                </span>
                {hit.roadAddress ? (
                  <span className="block w-full break-words text-[11px] text-ink-faint">
                    지번: {hit.address}
                  </span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
