import { env } from "@/shared/lib/env";

const SCRIPT_ID = "kakao-maps-sdk";

let loadPromise: Promise<void> | null = null;

const buildScriptUrl = (appkey: string): string =>
  `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(appkey)}&autoload=false&libraries=services`;

export const loadKakaoMapsSdk = (): Promise<void> => {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("카카오 SDK는 브라우저에서만 로드할 수 있어요."));
  }
  if (window.kakao?.maps) {
    return Promise.resolve();
  }
  if (loadPromise) return loadPromise;
  if (!env.NEXT_PUBLIC_KAKAO_JS_KEY) {
    return Promise.reject(new Error("NEXT_PUBLIC_KAKAO_JS_KEY 가 설정되어 있지 않아요."));
  }

  loadPromise = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    const script = existing ?? document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = buildScriptUrl(env.NEXT_PUBLIC_KAKAO_JS_KEY as string);

    const onReady = () => {
      if (!window.kakao?.maps) {
        reject(new Error("카카오 SDK 로드 실패 — window.kakao.maps 없음"));
        return;
      }
      window.kakao.maps.load(() => resolve());
    };

    script.onload = onReady;
    script.onerror = () => reject(new Error("카카오 SDK 스크립트 로드 실패"));

    if (!existing) document.head.appendChild(script);
    else if (window.kakao?.maps) onReady();
  });

  return loadPromise;
};
