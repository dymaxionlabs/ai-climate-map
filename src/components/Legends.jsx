import MapControl from "./MapControl";

const CategoricalLegend = ({ data }) => (
  <div>
    <span>{data.title}</span>
    <ul>
      {data.levels.map((level, i) => (
        <li key={i}>{level.value}</li>
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
