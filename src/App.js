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
const buildTitilerProvider = (cogPath) =>
  new UrlTemplateImageryProvider({
    url: `${
      process.env.REACT_APP_TITILER_URL
    }/cog/tiles/{z}/{x}/{y}.png?url=${encodeURIComponent(
      cogsUrlPrefix + cogPath
    )}&colormap_name=ylorrd&resampling_method=bilinear`,
  });

export default function Cesium() {
  const [basemapId, setBasemapId] = useState(0);
  const [locationId, setLocationId] = useState(0);
  const [activeByLayer, setActiveByLayer] = useState({});
  const [opacityByLayer, setOpacityByLayer] = useState({});

  const location = useMemo(() => locations[locationId], [locationId]);

  const layerProviders = useMemo(
    () => location.layers.map((layer) => buildTitilerProvider(layer.path)),
    [location]
  );

  const layers = useMemo(() => {
    const newLayers = location.layers.map((layer, i) => ({
      ...layer,
      id: i,
      active: activeByLayer[i] || false,
      opacity: opacityByLayer[i] || 100,
      provider: layerProviders[i],
    }));
    // console.log("Layers", newLayers);
    return newLayers;
  }, [location, layerProviders, activeByLayer, opacityByLayer]);

  const reversedLayers = useMemo(() => [...layers].reverse(), [layers]);

  const groups = useMemo(() => {
    const { groups } = location;
    const newGroups = groups.map((group) => ({
      ...group,
      layers: layers.filter((layer) => layer.group === group.id),
    }));
    // console.log("Groups:", newGroups);
    return newGroups;
  }, [location, layers]);

  const handleLocationChange = (i) => setLocationId(Number(i));

  const handleBasemapChange = (i) => {
    // console.log("basemap", i);
    setBasemapId(Number(i));
  };

  const handleLayerToggle = (id, value) => {
    // console.log("toggle", id, value);
    setActiveByLayer({ ...activeByLayer, [id]: value });
  };

  const handleLayerOpacityChange = (id, value) => {
    setOpacityByLayer({ ...opacityByLayer, [id]: value });
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
            colorToAlpha={new Color(1, 1, 0.7, 1)}
            colorToAlphaThreshold={0.075}
            show={layer.active}
            alpha={layer.opacity / 100.0}
            imageryProvider={layer.provider}
          />
        ))}
      <CameraFlyTo destination={location.center} />
    </Viewer>
  );
}
