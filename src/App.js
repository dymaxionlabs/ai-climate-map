import { Color, BingMapsImageryProvider, UrlTemplateImageryProvider, CesiumTerrainProvider, ShadowMode } from "cesium";
import { CameraFlyTo, ImageryLayer, Viewer } from "resium";
import { useState, useMemo } from 'react'
import LocationSelector from './components/LocationSelector'
import LayerSelector from './components/LayerSelector'
import './App.css';

import { locations as allLocations } from './data'

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

export default function Cesium() {
  const [currentLocation, setCurrentLocation] = useState(allLocations[0]);
  const [activeByLayer, setActiveByLayer] = useState({})
  const [opacityByLayer, setOpacityByLayer] = useState({})

  const layerProviders = useMemo(() =>
    currentLocation.layers.map(layer => buildTitilerProvider(layer.path)), [currentLocation])

  const layers = useMemo(() => {
    const newLayers = currentLocation.layers.map((layer, i) => ({
      ...layer,
      active: activeByLayer[i] || false,
      opacity: opacityByLayer[i] || 100,
      provider: layerProviders[i]
    }))
    return newLayers
  }, [currentLocation, layerProviders, activeByLayer, opacityByLayer])

  const handleLayerToggle = (i, value) => {
    setActiveByLayer({ ...activeByLayer, [i]: value })
  }

  const handleLayerOpacityChange = (i, value) => {
    setOpacityByLayer({ ...opacityByLayer, [i]: value })
  }

  return (
    <Viewer
      timeline={false}
      animation={false}
      baseLayerPicker={false}
      shadows
      terrainShadows={ShadowMode.CAST_ONLY}
      terrainProvider={terrainProvider}
    >
      <LocationSelector
        items={allLocations}
        onChange={i => setCurrentLocation(allLocations[i])}
      />
      {layers && layers.length > 0 && <LayerSelector
        items={layers}
        onToggle={handleLayerToggle}
        onOpacityChange={handleLayerOpacityChange}
      />}
      <ImageryLayer imageryProvider={bingProvider} />
      {layers && layers.map(layer => (
        <ImageryLayer
          key={layer.path}
          colorToAlpha={new Color(1, 1, 0.7, 1)}
          colorToAlphaThreshold={0.075}
          show={layer.active}
          alpha={layer.opacity / 100.0}
          imageryProvider={layer.provider}
        />
      ))}
      <CameraFlyTo destination={currentLocation.center} />
    </Viewer>
  )
}