import { useEffect, useRef, useState } from "react";

type LatLng = { lat: number; lng: number; label: string };

// Home base plus a few of the real deployment sites and AWS regions this
// portfolio's work actually touches — the globe's arcs trace that footprint
// rather than being decorative random lines.
const groundPoints: LatLng[] = [
  { lat: 28.89, lng: 76.61, label: "Rohtak, India" },
  { lat: 22.77, lng: 74.59, label: "Jhabua, India" },
  { lat: 22.09, lng: 82.15, label: "Bilaspur, India" },
  { lat: 28.84, lng: 78.78, label: "Moradabad, India" },
  { lat: 19.08, lng: 72.88, label: "Mumbai, India" },
  { lat: 38.95, lng: -77.34, label: "AWS us-east-1" },
  { lat: 50.11, lng: 8.68, label: "AWS eu-central-1" },
  { lat: 1.35, lng: 103.82, label: "AWS ap-southeast-1" },
];
const home = groundPoints[0];
const arcs = groundPoints.slice(1).map((point) => ({
  startLat: home.lat,
  startLng: home.lng,
  endLat: point.lat,
  endLng: point.lng,
}));

export function HeroGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let disposed = false;
    let globeInstance: ReturnType<typeof import("globe.gl").default> | undefined;
    let resizeObserver: ResizeObserver | undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isNarrow = window.innerWidth < 700;

    (async () => {
      const container = containerRef.current;
      if (!container) return;
      try {
        const [{ default: Globe }, worldAtlas, topojsonClient] =
          await Promise.all([
            import("globe.gl"),
            import("world-atlas/countries-110m.json"),
            import("topojson-client"),
          ]);
        if (disposed || !containerRef.current) return;

        const topology = worldAtlas.default as unknown as Parameters<
          typeof topojsonClient.feature
        >[0];
        const countries = (
          topojsonClient.feature(
            topology,
            topology.objects.countries,
          ) as GeoJSON.FeatureCollection
        ).features;

        const size = container.clientWidth;
        globeInstance = Globe()(container)
          .width(size)
          .height(size)
          .backgroundColor("rgba(0,0,0,0)")
          .showAtmosphere(true)
          .atmosphereColor("#E4B928")
          .atmosphereAltitude(0.18)
          .hexPolygonsData(countries)
          .hexPolygonResolution(isNarrow ? 2 : 3)
          .hexPolygonMargin(0.24)
          .hexPolygonUseDots(false)
          .hexPolygonColor(() => "rgba(228,185,40,0.65)")
          .hexPolygonAltitude(0.005)
          .pointsData(groundPoints)
          .pointLat("lat")
          .pointLng("lng")
          .pointColor(() => "#F2C94C")
          .pointAltitude(0.012)
          .pointRadius(0.35)
          .pointsMerge(true)
          .ringsData(isNarrow ? [] : groundPoints.slice(0, 4))
          .ringColor(() => (t: number) => `rgba(228,185,40,${1 - t})`)
          .ringMaxRadius(3.2)
          .ringPropagationSpeed(1.4)
          .ringRepeatPeriod(2600)
          .arcsData(arcs)
          .arcColor(() => ["rgba(228,185,40,0.05)", "rgba(242,201,76,0.85)"])
          .arcAltitude(0.28)
          .arcStroke(0.4)
          .arcDashLength(0.4)
          .arcDashGap(2.2)
          .arcDashAnimateTime(reducedMotion ? 0 : 2600)
          .arcsTransitionDuration(0);

        const material = globeInstance.globeMaterial();
        material.color?.set?.("#0d0d0b");
        if (material.emissive) material.emissive.set("#050403");
        material.shininess = 4;

        const controls = globeInstance.controls();
        controls.autoRotate = !reducedMotion;
        controls.autoRotateSpeed = 0.55;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.enableRotate = !isNarrow;

        globeInstance.pointOfView({ lat: 18, lng: 40, altitude: 2.15 });
        globeInstance.renderer().setPixelRatio(
          Math.min(window.devicePixelRatio || 1, isNarrow ? 1.5 : 2),
        );

        const g = globeInstance;
        resizeObserver = new ResizeObserver(() => {
          if (!containerRef.current) return;
          const next = containerRef.current.clientWidth;
          g.width(next).height(next);
        });
        resizeObserver.observe(container);

        setReady(true);
      } catch {
        if (!disposed) setFailed(true);
      }
    })();

    return () => {
      disposed = true;
      resizeObserver?.disconnect();
      if (globeInstance) {
        globeInstance.controls().dispose();
        globeInstance.renderer().dispose();
      }
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, []);

  return (
    <div className="hero-globe-canvas-wrap" aria-hidden="true">
      <div
        ref={containerRef}
        className={`hero-globe-canvas ${ready ? "is-ready" : ""}`}
      />
      {!ready && <div className="hero-globe-fallback" />}
      {failed && <div className="hero-globe-fallback is-static" />}
    </div>
  );
}
