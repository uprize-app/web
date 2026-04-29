/**
 * 카카오맵 JS SDK 의 우리가 실제 사용하는 부분만 타입화.
 * SDK 전체를 정의하지 않고, 호출하는 메서드 시그니처만 좁게.
 */

export type KakaoStatus = "OK" | "ZERO_RESULT" | "ERROR";

export type KakaoLatLng = {
  getLat: () => number;
  getLng: () => number;
};

export type KakaoMouseEvent = {
  latLng: KakaoLatLng;
};

export type KakaoMap = {
  setCenter: (latLng: KakaoLatLng) => void;
  panTo: (latLng: KakaoLatLng) => void;
  setLevel: (level: number) => void;
  getLevel: () => number;
  relayout: () => void;
};

export type KakaoMarker = {
  setPosition: (latLng: KakaoLatLng) => void;
  setMap: (map: KakaoMap | null) => void;
};

export type KakaoMapOptions = {
  center: KakaoLatLng;
  level?: number; // 1(가장 가까이) ~ 14
  draggable?: boolean;
};

/** 키워드 검색 결과 (services.Places.keywordSearch) */
export type KakaoPlace = {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name: string;
  x: string; // longitude
  y: string; // latitude
  category_name?: string;
};

/** 좌표→주소 결과 (services.Geocoder.coord2Address) */
export type KakaoCoord2AddressResult = {
  address: {
    address_name: string;       // "서울 강남구 역삼동 123-4"
    region_1depth_name: string; // "서울"
    region_2depth_name: string; // "강남구"
    region_3depth_name: string; // "역삼동"
    main_address_no: string;
    sub_address_no: string;
  };
  road_address?: {
    address_name: string;       // 도로명
    road_name: string;
    building_name?: string;
  } | null;
};

/** 주소→좌표 결과 (services.Geocoder.addressSearch) */
export type KakaoAddressSearchResult = {
  address_name: string;
  x: string;
  y: string;
};

type PlacesCtor = new () => {
  keywordSearch: (
    keyword: string,
    callback: (data: KakaoPlace[], status: KakaoStatus) => void,
    options?: { size?: number },
  ) => void;
};

type GeocoderCtor = new () => {
  coord2Address: (
    lng: number,
    lat: number,
    callback: (result: KakaoCoord2AddressResult[], status: KakaoStatus) => void,
  ) => void;
  addressSearch: (
    address: string,
    callback: (result: KakaoAddressSearchResult[], status: KakaoStatus) => void,
  ) => void;
};

export type KakaoServices = {
  Places: PlacesCtor;
  Geocoder: GeocoderCtor;
  Status: { OK: "OK"; ZERO_RESULT: "ZERO_RESULT"; ERROR: "ERROR" };
};

export type KakaoMaps = {
  load: (callback: () => void) => void;
  Map: new (container: HTMLElement, options: KakaoMapOptions) => KakaoMap;
  LatLng: new (lat: number, lng: number) => KakaoLatLng;
  Marker: new (options: { position: KakaoLatLng; map?: KakaoMap | null }) => KakaoMarker;
  event: {
    addListener: <T extends string>(
      target: KakaoMap | KakaoMarker,
      eventName: T,
      handler: T extends "click" ? (event: KakaoMouseEvent) => void : () => void,
    ) => void;
  };
  services: KakaoServices;
};

declare global {
  interface Window {
    kakao?: { maps: KakaoMaps };
  }
}

export {};
