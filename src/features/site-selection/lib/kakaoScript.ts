import type { KakaoMaps } from "../types/kakao.types";

/**
 * 카카오맵 JS SDK 를 한 번만 로드하는 싱글톤.
 * 동시에 여러 컴포넌트가 호출해도 같은 Promise 를 공유.
 */

const SDK_SRC =
  "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&libraries=services";

let loadPromise: Promise<KakaoMaps> | null = null;

const getJsKey = (): string => {
  const key = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
  if (!key) {
    throw new Error(
      "NEXT_PUBLIC_KAKAO_JS_KEY 가 설정되지 않았습니다. .env.local 을 확인하세요.",
    );
  }
  return key;
};

export const loadKakaoMaps = (): Promise<KakaoMaps> => {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("loadKakaoMaps 는 브라우저에서만 호출 가능합니다."));
  }

  if (window.kakao?.maps) {
    return Promise.resolve(window.kakao.maps);
  }

  if (loadPromise) return loadPromise;

  loadPromise = new Promise<KakaoMaps>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-kakao-sdk="true"]',
    );

    const onScriptLoaded = () => {
      const kakao = window.kakao;
      if (!kakao) {
        reject(new Error("카카오맵 SDK 로드 실패: window.kakao 미정의"));
        return;
      }
      kakao.maps.load(() => resolve(kakao.maps));
    };

    if (existing) {
      existing.addEventListener("load", onScriptLoaded, { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("카카오맵 SDK 스크립트 로드 실패")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = `${SDK_SRC}&appkey=${getJsKey()}`;
    script.async = true;
    script.dataset.kakaoSdk = "true";
    script.onload = onScriptLoaded;
    script.onerror = () => {
      loadPromise = null; // 재시도 가능하도록
      reject(new Error("카카오맵 SDK 스크립트 로드 실패"));
    };
    document.head.appendChild(script);
  });

  return loadPromise;
};
