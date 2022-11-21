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
    legends: [
      {
        id: "l1-tegu",
        type: "categorical",
        title: "Informal Settlements",
        levels: [
          { value: "New", color: "#ffffd4" },
          { value: "In Development", color: "#fe9929" },
          { value: "Consolidated", color: "#993404" },
        ],
      },
    ],
    layers: [
      {
        group: "l1",
        name: "GT",
        path: "/gt/l1/tegu_rgb.tif",
        legend: "l1-tegu",
      },
      {
        group: "l1",
        name: "Local",
        path: "/l1/tegu/local_rgb.tif",
        legend: "l1-tegu",
      },
      {
        group: "l1",
        name: "Global",
        path: "/l1/tegu/global_rgb.tif",
        legend: "l1-tegu",
      },
      {
        group: "l2",
        name: "GT",
        path: "/gt/l2/tegu_rgb.tif",
      },
      {
        group: "l2",
        name: "Local",
        path: "/l2/tegu/l2_tegu_local.tif",
        cmap: "blues",
        colorToAlpha: [1, 1, 1, 1],
      },
      {
        group: "l2",
        name: "Global",
        path: "/l2/tegu/l2_tegu_global.tif",
        cmap: "blues",
        colorToAlpha: [1, 1, 1, 1],
      },
      {
        group: "l3",
        name: "GT",
        path: "/gt/l3/tegu_rgb.tif",
      },
      {
        group: "l3",
        name: "Local",
        path: "/l3/tegu/l3_tegu_local.tif",
        cmap: "reds",
        colorToAlpha: [1, 0.9, 0.9, 1],
      },
      {
        group: "l3",
        name: "Global",
        path: "/l3/tegu/l3_tegu_global.tif",
        cmap: "reds",
        colorToAlpha: [1, 0.9, 0.9, 1],
      },
      {
        group: "l4",
        name: "GT",
        path: "/gt/l4/tegu_rgb.tif",
      },
      {
        group: "l4",
        name: "Global",
        path: "/l4/tegu/l4_tegu_global_rgb.tif",
      },
      {
        group: "l4",
        name: "Local",
        path: "/l4/tegu/l4_tegu_local_rgb.tif",
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
        group: "l1",
        name: "GT",
        path: "/gt/l1/sula_rgb.tif",
      },
      {
        group: "l1",
        name: "Local",
        path: "/l1/sula/l1_sula_local.tif",
        cmap: "ylorbr",
        colorToAlpha: [1, 1, 0.95, 1],
      },
      {
        group: "l1",
        name: "Global",
        path: "/l1/sula/l1_sula_global.tif",
        cmap: "ylorbr",
        colorToAlpha: [1, 1, 0.95, 1],
      },
      {
        group: "l2",
        name: "GT - Extreme",
        path: "/gt/l2/sula_extreme_rgb.tif",
      },
      {
        group: "l2",
        name: "GT - Moderate",
        path: "/gt/l2/sula_moderate_rgb.tif",
      },
      {
        group: "l2",
        name: "Local - Extreme",
        path: "/l2/sula/l2_sula_local_extremo.tif",
        cmap: "blues",
        colorToAlpha: [0.9, 0.94, 0.98, 1],
      },
      {
        group: "l2",
        name: "Local - Moderate",
        path: "/l2/sula/l2_sula_local_moderado.tif",
        cmap: "blues",
        colorToAlpha: [0.9, 0.94, 0.98, 1],
      },
      {
        group: "l2",
        name: "Global - Extreme",
        path: "/l2/sula/l2_sula_global_extremo.tif",
        cmap: "blues",
        colorToAlpha: [0.9, 0.94, 0.98, 1],
      },
      {
        group: "l2",
        name: "Global - Moderate",
        path: "/l2/sula/l2_sula_global_moderado.tif",
        cmap: "blues",
        colorToAlpha: [0.9, 0.94, 0.98, 1],
      },
      {
        group: "l3",
        name: "Local",
        path: "/l3/sula/l3_sula_local.tif",
        cmap: "reds",
        colorToAlpha: [1, 0.96, 0.94, 1],
      },
      {
        group: "l3",
        name: "Global",
        path: "/l3/sula/l3_sula_global.tif",
        cmap: "reds",
        colorToAlpha: [1, 0.96, 0.94, 1],
      },
      {
        group: "l4",
        name: "GT",
        path: "/gt/l4/sula_rgb.tif",
      },
      {
        group: "l4",
        name: "Global - Extreme",
        path: "/l4/sula/l4_sula_global_extremo_rgb.tif",
      },
      {
        group: "l4",
        name: "Global - Moderate",
        path: "/l4/sula/l4_sula_global_moderado_rgb.tif",
      },
      {
        group: "l4",
        name: "Local - Extreme",
        path: "/l4/sula/l4_sula_local_extremo_rgb.tif",
      },
      {
        group: "l4",
        name: "Local - Moderate",
        path: "/l4/sula/l4_sula_local_moderado_rgb.tif",
      },
    ],
  },
];
