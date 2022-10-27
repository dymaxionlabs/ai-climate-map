import { Cartesian3 } from "cesium";

export const locations = [
  {
    name: "Tegucigalpa, Honduras",
    // center: Cartesian3.fromDegrees(-87.1715002, 14.065049, 15000),
    center: Cartesian3.fromDegrees(-87.2399923, 14.0839129, 15000),
    layers: [
      {
        name: "Flooded areas (Global)",
        path: "/l2/tegu/flood_TEGU_low_moderado_smooth_160_30_clipbythr10.tif",
      },
      {
        name: "Flooded areas (Local)",
        path: "/l2/tegu/results_floods_TEGU_planet_160_40_thr5.tif",
      },
    ],
  },
  {
    name: "Valle de Sula, Honduras",
    center: Cartesian3.fromDegrees(-87.9242207, 15.4516219, 15000),
    layers: [],
  },
];
