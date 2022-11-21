import MapControl from "./MapControl";

const legends = {
  blues: [
    [0, "#f7fbff"],
    [13, "#deebf7"],
    [26, "#c6dbef"],
    [39, "#9ecae1"],
    [52, "#6baed6"],
    [65, "#4292c6"],
    [78, "#2171b5"],
    [90, "#08519c"],
    [100, "#08306b"],
  ],
  reds: [
    [0, "#fff5f0"],
    [13, "#fee0d2"],
    [26, "#fcbba1"],
    [39, "#fc9272"],
    [52, "#fb6a4a"],
    [65, "#ef3b2c"],
    [78, "#cb181d"],
    [90, "#a50f15"],
    [100, "#67000d"],
  ],
  ylorbr: [
    [0, "#ffffd4"],
    [25, "#fed98e"],
    [50, "#fe9929"],
    [75, "#d95f0e"],
    [100, "#993404"],
  ],
};

const ColorBlock = ({ value }) => (
  <div className="color-block" style={{ backgroundColor: value }}>
    &nbsp;
  </div>
);

const CategoricalLegend = ({ data }) => (
  <div>
    <p className="title">{data.title}</p>
    <ul>
      {data.levels.map((level, i) => (
        <li key={i}>
          <ColorBlock value={level.color} />
          {level.value}
        </li>
      ))}
    </ul>
  </div>
);

const GradientBlock = ({ stops }) => (
  <div
    className="gradient-block"
    style={{
      background: `linear-gradient(90deg, ${stops
        .map(([perc, color]) => `${color} ${perc}%`)
        .join(", ")})`,
    }}
  ></div>
);

const GradientLegend = ({ data }) => (
  <div>
    <p className="title">{data.title}</p>
    <div>
      <span>{data.start}</span>
      <GradientBlock stops={legends[data.cmap]} />
      <span>{data.end}</span>
    </div>
  </div>
);

const Legends = ({ items }) => (
  <MapControl className="legends">
    {items.map((legend) =>
      legend.type === "categorical" ? (
        <CategoricalLegend data={legend} />
      ) : (
        <GradientLegend data={legend} />
      )
    )}
  </MapControl>
);

export default Legends;
