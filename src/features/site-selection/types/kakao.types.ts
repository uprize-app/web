export type KakaoLatLng = {
  getLat: () => number;
  getLng: () => number;
};

export type KakaoMap = {
  setCenter: (latlng: KakaoLatLng) => void;
  getCenter: () => KakaoLatLng;
  setLevel: (level: number) => void;
  relayout: () => void;
};

export type KakaoMarker = {
  setMap: (map: KakaoMap | null) => void;
  setPosition: (latlng: KakaoLatLng) => void;
  getPosition: () => KakaoLatLng;
};

export type KakaoMouseEvent = {
  latLng: KakaoLatLng;
};

type KakaoGeocoderResult = {
  address: { address_name: string } | null;
  road_address: { address_name: string } | null;
};

export type KakaoAddressSearchResult = {
  address_name: string;
  road_address: { address_name: string } | null;
  x: string;
  y: string;
};

export type KakaoStatus = "OK" | "ZERO_RESULT" | "ERROR";

export type KakaoGeocoder = {
  coord2Address: (
    lng: number,
    lat: number,
    callback: (result: KakaoGeocoderResult[], status: KakaoStatus) => void,
  ) => void;
  addressSearch: (
    query: string,
    callback: (result: KakaoAddressSearchResult[], status: KakaoStatus) => void,
  ) => void;
};

type KakaoEventTarget = KakaoMap | KakaoMarker;

export type KakaoMaps = {
  load: (callback: () => void) => void;
  LatLng: new (lat: number, lng: number) => KakaoLatLng;
  Map: new (container: HTMLElement, options: { center: KakaoLatLng; level: number }) => KakaoMap;
  Marker: new (options: { position: KakaoLatLng; map?: KakaoMap }) => KakaoMarker;
  event: {
    addListener: (target: KakaoEventTarget, type: string, handler: (event: KakaoMouseEvent) => void) => void;
    removeListener: (target: KakaoEventTarget, type: string, handler: (event: KakaoMouseEvent) => void) => void;
  };
  services: {
    Geocoder: new () => KakaoGeocoder;
    Status: Record<KakaoStatus, KakaoStatus>;
  };
};

declare global {
  interface Window {
    kakao?: {
      maps: KakaoMaps;
    };
  }
}

export {};
