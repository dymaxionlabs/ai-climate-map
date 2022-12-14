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
import MapControlGroup from "./components/MapControlGroup";
import LocationSelect from "./components/LocationSelect";
import LayerSelect from "./components/LayerSelect";
import Legends from "./components/Legends";
import "./App.css";

import { locations, categories } from "./data";

if (import.meta.env.VITE_APP_CESIUMION_TOKEN) {
  Ion.defaultAccessToken = import.meta.env.VITE_APP_CESIUMION_TOKEN;
}

const terrainTilesetName = "alos30_honduras";
const terrainProvider = new CesiumTerrainProvider({
  url: `${import.meta.env.VITE_APP_CESIUMTS_URL}/${terrainTilesetName}`,
});

const bingProvider = new BingMapsImageryProvider({
  url: "https://dev.virtualearth.net",
  key: import.meta.env.VITE_APP_BINGMAPS_KEY,
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
      import.meta.env.VITE_APP_TITILER_URL
    }/cog/tiles/{z}/{x}/{y}.png?url=${encodeURIComponent(
      cogsUrlPrefix + cogPath
    )}${cmapParam}&resampling_method=bilinear`,
  });
};

const getColorToAlpha = (layer) => {
  if (!layer.colorToAlpha) return;
  return new Color(...layer.colorToAlpha);
};

function App() {
  const [basemapId, setBasemapId] = useState(0);
  const [locationId, setLocationId] = useState(0);
  const [activeByLayer, setActiveByLayer] = useState({});
  const [opacityByLayer, setOpacityByLayer] = useState({});
  const [flyToActivated, setFlyToActivated] = useState(true);
  const [categoryId, setCategoryId] = useState(0);

  const location = useMemo(() => locations[locationId], [locationId]);
  const category = useMemo(() => categories[categoryId], [categoryId]);

  const layerProviders = useMemo(
    () =>
      location.layers.map((layer) =>
        buildTitilerProvider(layer.path, layer.cmap)
      ),
    [location]
  );

  const allLayers = useMemo(
    () =>
      location.layers.map((layer, i) => ({
        ...layer,
        id: i,
        provider: layerProviders[i],
      })),
    [location, layerProviders]
  );

  const layers = useMemo(() => {
    const newLayers = allLayers.map((layer) => {
      const _id = `${locationId}-${layer.id}`;
      const visible =
        !(layer.category && category.id !== "") ||
        layer.category === category.id;
      // console.log("layers:", _id);
      return {
        ...layer,
        active: activeByLayer[_id] || false,
        opacity: opacityByLayer[_id] || 100,
        visible,
      };
    });
    // console.log("Layers", newLayers);
    return newLayers;
  }, [allLayers, locationId, category, activeByLayer, opacityByLayer]);

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
    // console.log("Groups:", newGroups);
    return newGroups;
  }, [location, layers]);

  const legends = useMemo(() => {
    if (!layers || !location) return [];
    const legendKeys = layers
      .filter((layer) => layer.active)
      .map((layer) => layer.legend);
    return location.legends.filter((legend) => legendKeys.includes(legend.id));
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

  const handleCategoryChange = (i) => setCategoryId(i);

  useEffect(() => {
    console.log("category:", categories[categoryId]);
  }, [categoryId]);

  return (
    <Viewer
      timeline={false}
      animation={false}
      baseLayerPicker={false}
      imageryProvider={false}
      geocoder={false}
      homeButton={false}
      shadows
      terrainShadows={ShadowMode.CAST_ONLY}
      terrainProvider={terrainProvider}
    >
      {/* Controls */}
      <MapControlGroup top left>
        <LocationSelect
          items={locations}
          value={locationId}
          onChange={handleLocationChange}
        />
      </MapControlGroup>
      {groups && groups.length > 0 && (
        <MapControlGroup bottom left>
          <LayerSelect
            locationId={locationId}
            groups={groups}
            basemaps={basemaps}
            basemap={basemapId}
            categories={categories}
            categoryId={categoryId}
            onCategoryChange={handleCategoryChange}
            onToggle={handleLayerToggle}
            onOpacityChange={handleLayerOpacityChange}
            onBasemapChange={handleBasemapChange}
          />
        </MapControlGroup>
      )}
      {legends && legends.length > 0 && (
        <MapControlGroup bottom right>
          <Legends items={legends} />
        </MapControlGroup>
      )}
      {/* Basemap */}
      {basemaps && basemaps.length > 0 && (
        <ImageryLayer imageryProvider={basemaps[0].provider} />
      )}
      {basemaps &&
        basemaps
          .slice(1)
          .map((basemap, i) => (
            <ImageryLayer
              key={`basemap-${i}`}
              imageryProvider={basemap.provider}
              show={basemapId === i + 1}
            />
          ))}
      {/* Layers */}
      {reversedLayers &&
        reversedLayers.map((layer) => (
          <ImageryLayer
            key={layer.path}
            colorToAlpha={getColorToAlpha(layer)}
            colorToAlphaThreshold={0.075}
            show={layer.active && layer.visible}
            alpha={layer.opacity / 100.0}
            imageryProvider={layer.provider}
          />
        ))}
      {flyToActivated && <CameraFlyTo destination={location.center} />}
    </Viewer>
  );
}

export default App;
