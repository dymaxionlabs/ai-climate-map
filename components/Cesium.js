import { Viewer, Entity, PointGraphics, EntityDescription, CameraFlyTo, ImageryLayer, } from "resium";
import { Cartesian3, createWorldTerrain, CesiumTerrainProvider, BingMapsImageryProvider } from "cesium";

// const terrainProvider = new CesiumTerrainProvider({
//   url: "http://localhost:8000/tilesets/tegu_global_12pt5"
// });
const bingProvider = new BingMapsImageryProvider({
  url: "https://dev.virtualearth.net",
  key: process.env.NEXT_PUBLIC_BINGMAPS_KEY
})

const tegucigalpa = Cartesian3.fromDegrees(-87.1715002, 14.065049, 1000);

export default function Cesium() {
  return (
    <Viewer
      full
      timeline={false}
      animation={false}
      shadows
    // terrainProvider={terrainProvider}
    >
      <ImageryLayer imageryProvider={bingProvider} />
      <CameraFlyTo destination={tegucigalpa} />
    </Viewer>
  )
}
