import { Viewer, GeoJsonDataSource } from "resium";
import "./App.css";

import { locations } from "./data";

if (process.env.VITE_APP_CESIUMION_TOKEN) {
  Ion.defaultAccessToken = process.env.VITE_APP_CESIUMION_TOKEN;
}

const terrainTilesetName = "alos30_honduras";
const terrainProvider = new CesiumTerrainProvider({
  url: `${process.env.VITE_APP_CESIUMTS_URL}/${terrainTilesetName}`,
});

const data = {
  type: "Feature",
  properties: {
    name: "Coors Field",
    amenity: "Baseball Stadium",
    popupContent: "This is where the Rockies play!",
  },
  geometry: {
    type: "Point",
    coordinates: [-104.99404, 39.75621],
  },
};

const polygonData = {
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

function App() {
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
      <GeoJsonDataSource data={polygonData} />
    </Viewer>
  );
}

export default App;
