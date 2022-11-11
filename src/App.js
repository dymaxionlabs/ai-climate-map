import {
  Color,
  BingMapsImageryProvider,
  OpenStreetMapImageryProvider,
  UrlTemplateImageryProvider,
  CesiumTerrainProvider,
  ShadowMode,
  GeoJsonDataSource,
  Ion,
  EasingFunction,
} from "cesium";
import { CameraFlyTo, ImageryLayer, Viewer, Cesium3DTileset } from "resium";
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

const testPolygonData = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-87.219498141941386, 14.087331012240163],
        [-87.219498141941386, 14.101579629976898],
        [-87.205249524204646, 14.101579629976898],
        [-87.205249524204646, 14.087331012240163],
        [-87.219498141941386, 14.087331012240163],
      ],
    ],
  },
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
      // console.log("layers:", _id);
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
      {basemaps && <ImageryLayer imageryProvider={basemaps[0].provider} />}
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
            colorToAlpha={new Color(1, 1, 0.8, 1)}
            colorToAlphaThreshold={0.075}
            show={layer.active}
            alpha={layer.opacity / 100.0}
            imageryProvider={layer.provider}
          />
        ))}
      <GeoJsonDataSource
        data={testPolygonData}
        markerColor={Color.RED}
        fill={Color.PINK}
        stroke={Color.HOTPINK}
        strokeWidth={3}
      />
      {/* <Cesium3DTileset
        show
        debugShowBoundingVolume
        showOutline
        outlineColor={new Color(1, 0, 0, 1)}
        enableDebugWireframe
        debugWireframe
        debugShowRenderingStatistics
        // style
        url="/3dtiles/test_tegu/tileset.json"
        onAllTilesLoad={() => console.log("3dtiles", "AllTilesLoad")}
        onInitialTilesLoad={() => console.log("3dtiles", "InitialTilesLoad")}
        onLoadProgress={(numberOfPendingRequests, numberOfTilesProcessing) =>
          console.log(
            "3dtiles",
            "LoadProgress",
            numberOfPendingRequests,
            numberOfTilesProcessing
          )
        }
        onTileFailed={(err) => console.error("3dtiles", "TileFailed", err)}
        onTileLoad={(tile) => console.log("3dtiles", "TileLoad", tile)}
        onTileUnload={() => console.log("3dtiles", "TileUnload")}
        onTileVisible={(tile) => console.log("3dtiles", "TileVisible", tile)}
      /> */}
      {flyToActivated && (
        <CameraFlyTo
          destination={location.center}
          easingFunction={EasingFunction.QUINTIC_IN_OUT}
        />
      )}
    </Viewer>
  );
}
