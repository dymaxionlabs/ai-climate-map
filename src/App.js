import { BingMapsImageryProvider, Cartesian3, CesiumTerrainProvider, ShadowMode } from "cesium";
import { CameraFlyTo, ImageryLayer, Viewer } from "resium";

const terrainProvider = new CesiumTerrainProvider({
  url: `${process.env.REACT_APP_CESIUMTS_URL}/alos30_honduras`
});

const bingProvider = new BingMapsImageryProvider({
  url: "https://dev.virtualearth.net",
  key: process.env.REACT_APP_BINGMAPS_KEY
})

const tegucigalpa = Cartesian3.fromDegrees(-87.1715002, 14.065049, 15000);

export default function Cesium() {
  return (
    <Viewer
      full
      timeline={false}
      animation={false}
      shadows
      terrainShadows={ShadowMode.CAST_ONLY}
      terrainProvider={terrainProvider}
    >
      <ImageryLayer imageryProvider={bingProvider} />
      <CameraFlyTo destination={tegucigalpa} />
    </Viewer>
  )
}
