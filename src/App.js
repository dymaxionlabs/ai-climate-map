import { Color, BingMapsImageryProvider, UrlTemplateImageryProvider, Cartesian3, CesiumTerrainProvider, ShadowMode } from "cesium";
import { CameraFlyTo, ImageryLayer, Viewer } from "resium";

const terrainTilesetName = "alos30_honduras";
const terrainProvider = new CesiumTerrainProvider({
  url: `${process.env.REACT_APP_CESIUMTS_URL}/${terrainTilesetName}`
});

const bingProvider = new BingMapsImageryProvider({
  url: "https://dev.virtualearth.net",
  key: process.env.REACT_APP_BINGMAPS_KEY
})

const buildTitilerProvider = (cogUrl) => new UrlTemplateImageryProvider({
  url: `${process.env.REACT_APP_TITILER_URL}/cog/tiles/{z}/{x}/{y}.png?url=${encodeURIComponent(cogUrl)}&colormap_name=ylorrd&resampling_method=bilinear`,
});

const tegucigalpa = Cartesian3.fromDegrees(-87.1715002, 14.065049, 15000);

export default function Cesium() {
  return (
    <Viewer
      timeline={false}
      animation={false}
      baseLayerPicker={false}
      shadows
      terrainShadows={ShadowMode.CAST_ONLY}
      terrainProvider={terrainProvider}
    >
      <ImageryLayer imageryProvider={bingProvider} />
      <ImageryLayer
        colorToAlpha={new Color(1, 1, 0.7, 1)}
        colorToAlphaThreshold={0.075}
        imageryProvider={buildTitilerProvider("s3://aiclimate-raster-cogs/l2/tegu/flood_TEGU_low_moderado_smooth_160_30_clipbythr10.tif")}
      />
      <CameraFlyTo destination={tegucigalpa} />
    </Viewer>
  )
}
