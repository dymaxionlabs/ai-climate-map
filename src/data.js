import { Cartesian3 } from "cesium";

export const categories = [
  { id: "", name: "Show all" },
  { id: "local", name: "Only Local (PlanetScope)" },
  { id: "global", name: "Only Global (Sentinel-2)" },
];

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
      { id: "l4", name: "Level 4: Land Value" },
    ],
    legends: [
      {
        id: "l1",
        type: "categorical",
        title: "Informal Settlements",
        levels: [
          { value: "New", color: "#ffffd4" },
          { value: "In Development", color: "#fe9929" },
          { value: "Consolidated", color: "#993404" },
        ],
      },
      {
        id: "l2",
        type: "gradient",
        title: "Flooded Area Probability",
        start: "0%",
        end: "100%",
        cmap: "blues",
      },
      {
        id: "l2-gt",
        type: "categorical",
        title: "Flooded Area (Ground Truth)",
        levels: [{ value: "Flooded Area", color: "#1f39cb" }],
      },
      {
        id: "l3-gt",
        type: "categorical",
        title: "Landslides (Ground Truth)",
        levels: [{ value: "Landslides", color: "#ac0003" }],
      },
      {
        id: "l3",
        type: "gradient",
        title: "Landslides Probability",
        start: "0%",
        end: "100%",
        cmap: "reds",
      },
      {
        id: "l4",
        type: "categorical",
        title: "Land Value",
        levels: [
          { value: "Public Area", color: "#33a02c" },
          { value: "Commercial Area", color: "#e62f21" },
          { value: "Historical Commercial Area", color: "#e62f21" },
          { value: "Residential Area: High", color: "#fbff09" },
          { value: "Residential Area: Medium", color: "#fbff85" },
          { value: "Residential Area: Medium-Low", color: "#f6ffc3" },
          { value: "Residential Area: Low", color: "#fff68d" },
          { value: "Residential Area: Very Low", color: "#fcffd8" },
          { value: "Government Area", color: "#040cef" },
          { value: "Distribution Area", color: "#ff7f00" },
        ],
      },
    ],
    layers: [
      {
        group: "l1",
        name: "Ground Truth",
        path: "/gt/l1/tegu_rgb.tif",
        legend: "l1",
      },
      {
        group: "l1",
        name: "Local",
        path: "/l1/tegu/local_rgb.tif",
        legend: "l1",
        category: "local",
      },
      {
        group: "l1",
        name: "Global",
        path: "/l1/tegu/global_rgb.tif",
        legend: "l1",
        category: "global",
      },
      {
        group: "l2",
        name: "Ground Truth",
        path: "/gt/l2/tegu_rgb.tif",
        legend: "l2-gt",
      },
      {
        group: "l2",
        name: "Local",
        path: "/l2/tegu/l2_tegu_local.tif",
        cmap: "blues",
        colorToAlpha: [1, 1, 1, 1],
        legend: "l2",
        category: "local",
      },
      {
        group: "l2",
        name: "Global",
        path: "/l2/tegu/l2_tegu_global.tif",
        cmap: "blues",
        colorToAlpha: [1, 1, 1, 1],
        legend: "l2",
        category: "global",
      },
      {
        group: "l3",
        name: "Ground Truth",
        path: "/gt/l3/tegu_rgb.tif",
        legend: "l3-gt",
      },
      {
        group: "l3",
        name: "Local",
        path: "/l3/tegu/l3_tegu_local.tif",
        cmap: "reds",
        colorToAlpha: [1, 0.9, 0.9, 1],
        legend: "l3",
        category: "local",
      },
      {
        group: "l3",
        name: "Global",
        path: "/l3/tegu/l3_tegu_global.tif",
        cmap: "reds",
        colorToAlpha: [1, 0.9, 0.9, 1],
        legend: "l3",
        category: "global",
      },
      {
        group: "l4",
        name: "Ground Truth",
        path: "/gt/l4/tegu_rgb.tif",
        legend: "l4",
      },
      {
        group: "l4",
        name: "Global",
        path: "/l4/tegu/l4_tegu_global_rgb.tif",
        legend: "l4",
        category: "global",
      },
      {
        group: "l4",
        name: "Local",
        path: "/l4/tegu/l4_tegu_local_rgb.tif",
        legend: "l4",
        category: "local",
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
      { id: "l4", name: "Level 4: Land Value" },
    ],
    legends: [
      {
        id: "l1-gt",
        type: "categorical",
        title: "Informal Settlements (Ground Truth)",
        levels: [{ value: "Settlements Area", color: "#e0c400" }],
      },
      {
        id: "l1",
        type: "gradient",
        title: "Informal Settlements Probability",
        start: "0%",
        end: "100%",
        cmap: "ylorbr",
      },
      {
        id: "l2-gt",
        type: "categorical",
        title: "Flooded Area (Ground Truth)",
        levels: [
          { value: "Extreme", color: "#1f3974" },
          { value: "Moderate", color: "#1f39cb" },
        ],
      },
      {
        id: "l2",
        type: "gradient",
        title: "Flooded Area Probability",
        start: "0%",
        end: "100%",
        cmap: "blues",
      },
      {
        id: "l3",
        type: "gradient",
        title: "Landslides Probability",
        start: "0%",
        end: "100%",
        cmap: "reds",
      },
      {
        id: "l4",
        type: "categorical",
        title: "Land Value",
        levels: [
          { value: "Commercial Area", color: "#d7191c" },
          { value: "DCN Area", color: "#040cef" },
          { value: "Educative Area", color: "#040cef" },
          { value: "Industrial Area", color: "#741cd2" },
          { value: "Mixed Area", color: "#ff7f00" },
          { value: "Reserve and Green Areas", color: "#33a02c" },
          { value: "Residential Area: High", color: "#f3e308" },
          { value: "Residential Area: Medium", color: "#f1eb99" },
          { value: "Residential Area: Low", color: "#ffffc0" },
        ],
      },
    ],
    layers: [
      {
        group: "l1",
        name: "Ground Truth",
        path: "/gt/l1/sula_rgb.tif",
        legend: "l1-gt",
      },
      {
        group: "l1",
        name: "Local",
        path: "/l1/sula/l1_sula_local.tif",
        cmap: "ylorbr",
        colorToAlpha: [1, 1, 0.95, 1],
        legend: "l1",
        category: "local",
      },
      {
        group: "l1",
        name: "Global",
        path: "/l1/sula/l1_sula_global.tif",
        cmap: "ylorbr",
        colorToAlpha: [1, 1, 0.95, 1],
        legend: "l1",
        category: "global",
      },
      {
        group: "l2",
        name: "Ground Truth - Extreme",
        path: "/gt/l2/sula_extreme_rgb.tif",
        legend: "l2-gt",
      },
      {
        group: "l2",
        name: "Ground Truth - Moderate",
        path: "/gt/l2/sula_moderate_rgb.tif",
        legend: "l2-gt",
      },
      {
        group: "l2",
        name: "Local - Extreme",
        path: "/l2/sula/l2_sula_local_extremo.tif",
        cmap: "blues",
        colorToAlpha: [0.9, 0.94, 0.98, 1],
        legend: "l2",
        category: "local",
      },
      {
        group: "l2",
        name: "Local - Moderate",
        path: "/l2/sula/l2_sula_local_moderado.tif",
        cmap: "blues",
        colorToAlpha: [0.9, 0.94, 0.98, 1],
        legend: "l2",
        category: "local",
      },
      {
        group: "l2",
        name: "Global - Extreme",
        path: "/l2/sula/l2_sula_global_extremo.tif",
        cmap: "blues",
        colorToAlpha: [0.9, 0.94, 0.98, 1],
        legend: "l2",
        category: "global",
      },
      {
        group: "l2",
        name: "Global - Moderate",
        path: "/l2/sula/l2_sula_global_moderado.tif",
        cmap: "blues",
        colorToAlpha: [0.9, 0.94, 0.98, 1],
        legend: "l2",
        category: "global",
      },
      {
        group: "l3",
        name: "Local",
        path: "/l3/sula/l3_sula_local.tif",
        cmap: "reds",
        colorToAlpha: [1, 0.96, 0.94, 1],
        legend: "l3",
        category: "local",
      },
      {
        group: "l3",
        name: "Global",
        path: "/l3/sula/l3_sula_global.tif",
        cmap: "reds",
        colorToAlpha: [1, 0.96, 0.94, 1],
        legend: "l3",
        category: "global",
      },
      {
        group: "l4",
        name: "Ground Truth",
        path: "/gt/l4/sula_rgb.tif",
        legend: "l4",
      },
      {
        group: "l4",
        name: "Global - Extreme",
        path: "/l4/sula/l4_sula_global_extremo_rgb.tif",
        legend: "l4",
        category: "global",
      },
      {
        group: "l4",
        name: "Global - Moderate",
        path: "/l4/sula/l4_sula_global_moderado_rgb.tif",
        legend: "l4",
        category: "global",
      },
      {
        group: "l4",
        name: "Local - Extreme",
        path: "/l4/sula/l4_sula_local_extremo_rgb.tif",
        legend: "l4",
        category: "local",
      },
      {
        group: "l4",
        name: "Local - Moderate",
        path: "/l4/sula/l4_sula_local_moderado_rgb.tif",
        legend: "l4",
        category: "local",
      },
    ],
  },
];
