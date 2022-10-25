import { Color, BingMapsImageryProvider, UrlTemplateImageryProvider, Cartesian3, CesiumTerrainProvider, ShadowMode } from "cesium";
import { CameraFlyTo, ImageryLayer, Viewer } from "resium";
import { useState } from 'react'
import './App.css';

const locations = [
  {
    name: "Tegucigalpa, Honduras",
    // center: Cartesian3.fromDegrees(-87.1715002, 14.065049, 15000),
    center: Cartesian3.fromDegrees(-87.2399923, 14.0839129, 15000),
    layers: [
      { path: "/l2/tegu/flood_TEGU_low_moderado_smooth_160_30_clipbythr10.tif" }
    ],
  },
  {
    name: "Valle de Sula, Honduras",
    center: Cartesian3.fromDegrees(-87.9242207, 15.4516219, 15000),
    layers: [

    ],
  },
]


const terrainTilesetName = "alos30_honduras";
const terrainProvider = new CesiumTerrainProvider({
  url: `${process.env.REACT_APP_CESIUMTS_URL}/${terrainTilesetName}`
});

const bingProvider = new BingMapsImageryProvider({
  url: "https://dev.virtualearth.net",
  key: process.env.REACT_APP_BINGMAPS_KEY
})

const cogsUrlPrefix = "s3://aiclimate-raster-cogs"
const buildTitilerProvider = (cogPath) => new UrlTemplateImageryProvider({
  url: `${process.env.REACT_APP_TITILER_URL}/cog/tiles/{z}/{x}/{y}.png?url=${encodeURIComponent(cogsUrlPrefix + cogPath)}&colormap_name=ylorrd&resampling_method=bilinear`,
});

const LocationSelector = ({ items, value, onChange }) => (
  <div className="location-selector">
    <span>
      Select a known location to explore:
    </span>
    <select onChange={(e) => onChange(e.target.value)}>
      {items.map((item, i) => (
        <option key={i} value={i} selected={value === i}>{item.name}</option>
      ))}
    </select>
  </div>
)

export default function Cesium() {
  const [currentLocation, setCurrentLocation] = useState(locations[0]);

  return (
    <Viewer
      timeline={false}
      animation={false}
      baseLayerPicker={false}
      shadows
      terrainShadows={ShadowMode.CAST_ONLY}
      terrainProvider={terrainProvider}
    >
      <LocationSelector items={locations} onChange={i => setCurrentLocation(locations[i])} />
      {/* <ImageryLayer imageryProvider={bingProvider} />
      <ImageryLayer
        colorToAlpha={new Color(1, 1, 0.7, 1)}
        colorToAlphaThreshold={0.075}
        imageryProvider={buildTitilerProvider(locations[0].layers[0].path)}
      /> */}
      <CameraFlyTo destination={currentLocation.center} />
    </Viewer>
  )
}
