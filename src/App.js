import {
  Color,
  BingMapsImageryProvider,
  OpenStreetMapImageryProvider,
  UrlTemplateImageryProvider,
  CesiumTerrainProvider,
  ShadowMode,
  Ion,
} from "cesium";
import { CameraFlyTo, ImageryLayer, Viewer } from "resium";
import { useState, useMemo, useEffect } from "react";
import LocationSelector from "./components/LocationSelector";
import LayerSelector from "./components/LayerSelector";
import "./App.css";

import { locations } from "./data";

if (process.env.REACT_APP_CESIUMION_TOKEN) {
  Ion.defaultAccessToken = process.env.REACT_APP_CESIUMION_TOKEN;
}

const terrainTilesetName = "alos30_honduras";
const terrainProvider = new CesiumTerrainProvider({
  url: `${process.env.REACT_APP_CESIUMTS_URL}/${terrainTilesetName}`,
});

const bingProvider = new BingMapsImageryProvider({
  url: "https://dev.virtualearth.net",
  key: process.env.REACT_APP_BINGMAPS_KEY,
});

const osmProvider = new OpenStreetMapImageryProvider({
  url: "https://a.tile.openstreetmap.org/",
});

const basemaps = [
  { name: "Bing Maps", provider: bingProvider },
  { name: "OpenStreetMap", provider: osmProvider },
];

const cogsUrlPrefix = "s3://aiclimate-raster-cogs";
const buildTitilerProvider = (cogPath, cmap) => {
  const cmapParam = cmap ? `&colormap_name=${cmap}` : "";
  return new UrlTemplateImageryProvider({
    url: `${
      process.env.REACT_APP_TITILER_URL
    }/cog/tiles/{z}/{x}/{y}.png?url=${encodeURIComponent(
      cogsUrlPrefix + cogPath
    )}${cmapParam}&resampling_method=bilinear`,
  });
};

export default function Cesium() {
  const [basemapId, setBasemapId] = useState(0);
  const [locationId, setLocationId] = useState(0);
  const [activeByLayer, setActiveByLayer] = useState({});
  const [opacityByLayer, setOpacityByLayer] = useState({});
  const [flyToActivated, setFlyToActivated] = useState(true);

  const location = useMemo(() => locations[locationId], [locationId]);

  const layerProviders = useMemo(
    () =>
      location.layers.map((layer) =>
        buildTitilerProvider(layer.path, layer.cmap)
      ),
    [location]
  );

  const layers = useMemo(() => {
    const newLayers = location.layers.map((layer, i) => {
      const _id = `${locationId}-${i}`;
      console.log("layers:", _id);
      return {
        ...layer,
        id: i,
        active: activeByLayer[_id] || false,
        opacity: opacityByLayer[_id] || 100,
        provider: layerProviders[i],
      };
    });
    // console.log("Layers", newLayers);
    return newLayers;
  }, [location, locationId, layerProviders, activeByLayer, opacityByLayer]);

  // useEffect(() => console.log("activeByLayer", activeByLayer), [activeByLayer]);

  // Workaround: If location changes, activate fly-to and set a timeout to disable it.
  // This will trigger a flyTo call on the Cesium map.
  useEffect(() => setFlyToActivated(true), [locationId]);
  useEffect(() => {
    if (flyToActivated) {
      setTimeout(() => setFlyToActivated(false), 100);
    }
  }, [flyToActivated]);

  const reversedLayers = useMemo(() => [...layers].reverse(), [layers]);

  const groups = useMemo(() => {
    const { groups } = location;
    const newGroups = groups.map((group) => ({
      ...group,
      layers: layers.filter((layer) => layer.group === group.id),
    }));
    console.log("Groups:", newGroups);
    return newGroups;
  }, [location, layers]);

  const handleLocationChange = (i) => setLocationId(Number(i));

  const handleBasemapChange = (i) => {
    // console.log("basemap", i);
    setBasemapId(Number(i));
  };

  const handleLayerToggle = (id, value) => {
    // console.log("toggle", id, value);
    setActiveByLayer({ ...activeByLayer, [`${locationId}-${id}`]: value });
  };

  const handleLayerOpacityChange = (id, value) => {
    setOpacityByLayer({ ...opacityByLayer, [`${locationId}-${id}`]: value });
  };

  return (
    <Viewer
      timeline={false}
      animation={false}
      baseLayerPicker={false}
      imageryProvider={false}
      shadows
      terrainShadows={ShadowMode.CAST_ONLY}
      terrainProvider={terrainProvider}
    >
      {/* Controls */}
      <LocationSelector
        items={locations}
        value={locationId}
        onChange={handleLocationChange}
      />
      {groups && groups.length > 0 && (
        <LayerSelector
          locationId={locationId}
          groups={groups}
          basemaps={basemaps}
          basemap={basemapId}
          onToggle={handleLayerToggle}
          onOpacityChange={handleLayerOpacityChange}
          onBasemapChange={handleBasemapChange}
        />
      )}
      {/* Basemap */}
      {basemaps &&
        basemaps.map((basemap, i) => (
          <ImageryLayer
            key={`basemap-${i}`}
            imageryProvider={basemap.provider}
            show={basemapId === i}
          />
        ))}
      {/* Layers */}
      {reversedLayers &&
        reversedLayers.map((layer) => (
          <ImageryLayer
            key={layer.path}
            colorToAlpha={new Color(1, 1, 0.8, 1)}
            colorToAlphaThreshold={0.075}
            show={layer.active}
            alpha={layer.opacity / 100.0}
            imageryProvider={layer.provider}
          />
        ))}
      {flyToActivated && <CameraFlyTo destination={location.center} />}
    </Viewer>
  );
}
