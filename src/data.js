import { Cartesian3 } from "cesium";

export const locations = [
  {
    id: "honduras",
    name: "Tegucigalpa, Honduras",
    // center: Cartesian3.fromDegrees(-87.1715002, 14.065049, 15000),
    center: Cartesian3.fromDegrees(-87.2399923, 14.0839129, 15000),
    groups: [
      { id: "l1", name: "Level 1: Informal Settlements" },
      { id: "l2", name: "Level 2: Flooded Areas" },
      { id: "l3", name: "Level 3: Landslides" },
      { id: "l4", name: "Level 4: Land use" },
    ],
    layers: [
      {
        group: "l2",
        name: "Global",
        path: "/l2/tegu/flood_TEGU_low_moderado_smooth_160_30_clipbythr10.tif",
      },
      {
        group: "l2",
        name: "Local",
        path: "/l2/tegu/results_floods_TEGU_planet_160_40_thr5.tif",
      },
    ],
  },
  {
    id: "sula",
    name: "Valle de Sula, Honduras",
    center: Cartesian3.fromDegrees(-87.9242207, 15.4516219, 15000),
    groups: [],
    layers: [],
  },
];
