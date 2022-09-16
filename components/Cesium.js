import { Viewer, Entity, PointGraphics, EntityDescription } from "resium";
import { Cartesian3, createWorldTerrain } from "cesium";

const terrainProvider = createWorldTerrain();
const tegucigalpa = Cartesian3.fromDegrees(14.065049, -87.1715002, 100);

export default function Cesium() {
  return (
    <Viewer full timeline={false} animation={false} terrainProvider={terrainProvider}>
      <Entity position={tegucigalpa} name="Tegucigalpa, Honduras">
        <PointGraphics pixelSize={10} />
      </Entity>
    </Viewer>
  )
}