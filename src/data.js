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
        name: "Local",
        path: "/l2/tegu/l2_tegu_local.tif",
        cmap: "blues",
      },
      {
        group: "l2",
        name: "Global",
        path: "/l2/tegu/l2_tegu_global.tif",
        cmap: "blues",
      },
      {
        group: "l3",
        name: "Local",
        path: "/l3/tegu/l3_tegu_local.tif",
        cmap: "reds",
      },
      {
        group: "l3",
        name: "Global",
        path: "/l3/tegu/l3_tegu_global.tif",
        cmap: "reds",
      },
    ],
  },
  {
    id: "sula",
    name: "Valle de Sula, Honduras",
    center: Cartesian3.fromDegrees(-87.9242207, 15.4516219, 15000),
    groups: [
      { id: "l1", name: "Level 1: Informal Settlements" },
      { id: "l2", name: "Level 2: Flooded Areas" },
      { id: "l3", name: "Level 3: Landslides" },
      { id: "l4", name: "Level 4: Land use" },
    ],
    layers: [
      {
        group: "l2",
        name: "Local - Extremo",
        path: "/l2/sula/l2_sula_local_extremo.tif",
        cmap: "blues",
      },
      {
        group: "l2",
        name: "Local - Moderado",
        path: "/l2/sula/l2_sula_local_moderado.tif",
        cmap: "blues",
      },
      {
        group: "l2",
        name: "Global - Extremo",
        path: "/l2/sula/l2_sula_global_extremo.tif",
        cmap: "blues",
      },
      {
        group: "l2",
        name: "Global - Moderado",
        path: "/l2/sula/l2_sula_global_moderado.tif",
        cmap: "blues",
      },
      {
        group: "l3",
        name: "Local",
        path: "/l3/sula/l3_sula_local.tif",
        cmap: "reds",
      },
      {
        group: "l3",
        name: "Global",
        path: "/l3/sula/l3_sula_global.tif",
        cmap: "reds",
      },
    ],
  },
];
