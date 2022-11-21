import MapControl from "./MapControl";

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

const GradientLegend = ({ data }) => (
  <div>
    <span>{data.title}</span>
    <span>To do...</span>
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
