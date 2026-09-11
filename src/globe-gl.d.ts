declare module "globe.gl" {
  type GlobeInstance = {
    (el: HTMLElement): GlobeInstance;
    width: (v: number) => GlobeInstance;
    height: (v: number) => GlobeInstance;
    backgroundColor: (v: string) => GlobeInstance;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    globeMaterial: (v?: unknown) => any;
    showAtmosphere: (v: boolean) => GlobeInstance;
    atmosphereColor: (v: string) => GlobeInstance;
    atmosphereAltitude: (v: number) => GlobeInstance;
    hexPolygonsData: (v: unknown[]) => GlobeInstance;
    hexPolygonResolution: (v: number) => GlobeInstance;
    hexPolygonMargin: (v: number) => GlobeInstance;
    hexPolygonUseDots: (v: boolean) => GlobeInstance;
    hexPolygonColor: (v: (d: unknown) => string) => GlobeInstance;
    hexPolygonAltitude: (v: number) => GlobeInstance;
    arcsData: (v: unknown[]) => GlobeInstance;
    arcColor: (v: (d: unknown) => string | string[]) => GlobeInstance;
    arcAltitude: (v: number | ((d: unknown) => number)) => GlobeInstance;
    arcStroke: (v: number) => GlobeInstance;
    arcDashLength: (v: number) => GlobeInstance;
    arcDashGap: (v: number) => GlobeInstance;
    arcDashAnimateTime: (v: number) => GlobeInstance;
    arcsTransitionDuration: (v: number) => GlobeInstance;
    pointsData: (v: unknown[]) => GlobeInstance;
    pointLat: (v: string | ((d: unknown) => number)) => GlobeInstance;
    pointLng: (v: string | ((d: unknown) => number)) => GlobeInstance;
    pointColor: (v: (d: unknown) => string) => GlobeInstance;
    pointAltitude: (v: number) => GlobeInstance;
    pointRadius: (v: number) => GlobeInstance;
    pointsMerge: (v: boolean) => GlobeInstance;
    pointResolution: (v: number) => GlobeInstance;
    ringsData: (v: unknown[]) => GlobeInstance;
    ringColor: (v: (d: unknown) => unknown) => GlobeInstance;
    ringMaxRadius: (v: number) => GlobeInstance;
    ringPropagationSpeed: (v: number) => GlobeInstance;
    ringRepeatPeriod: (v: number) => GlobeInstance;
    pointOfView: (
      v: { lat?: number; lng?: number; altitude?: number },
      transitionMs?: number,
    ) => GlobeInstance;
    controls: () => {
      autoRotate: boolean;
      autoRotateSpeed: number;
      enableZoom: boolean;
      enablePan: boolean;
      enableRotate: boolean;
      minPolarAngle: number;
      maxPolarAngle: number;
      dispose: () => void;
    };
    scene: () => unknown;
    camera: () => unknown;
    renderer: () => { setPixelRatio: (v: number) => void; dispose: () => void };
    _destructor?: () => void;
  };
  const Globe: () => GlobeInstance;
  export default Globe;
}
