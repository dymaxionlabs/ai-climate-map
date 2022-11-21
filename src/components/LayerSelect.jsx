import MapControl from "./MapControl";

const LayerItem = ({
  id,
  name,
  active,
  opacity,
  onToggle,
  onOpacityChange,
}) => {
  return (
    <div>
      <input
        id={`layer-${id}`}
        className="active"
        type="checkbox"
        value={active}
        onChange={(e) => onToggle(id, e.target.value !== "true")}
      />
      <label htmlFor={`layer-${id}`} className="name">
        {name}
      </label>
      <input
        className="opacity-slider"
        type="range"
        min="0"
        max="100"
        onChange={(e) => onOpacityChange(id, e.target.value)}
        value={opacity}
      />
    </div>
  );
};

const BasemapSelect = ({ items, value, onChange }) => (
  <select onChange={(e) => onChange(e.target.value)} value={value}>
    {items.map((item, i) => (
      <option key={i} value={i}>
        {item.name}
      </option>
    ))}
  </select>
);

const LayerSelect = ({
  locationId,
  groups,
  basemaps,
  basemap,
  onToggle,
  onOpacityChange,
  onBasemapChange,
}) => (
  <MapControl className="layer-selector" left bottom>
    {basemaps && (
      <BasemapSelect
        items={basemaps}
        value={basemap}
        onChange={onBasemapChange}
      />
    )}
    <div className="list-container">
      <ul>
        {groups.map((group) => (
          <li key={`${locationId}-${group.id}`}>
            <span>{group.name}</span>
            <ul>
              {group.layers.map((layer) => (
                <li key={`${locationId}-${layer.id}`}>
                  <LayerItem
                    id={layer.id}
                    name={layer.name}
                    active={layer.active}
                    opacity={layer.opacity}
                    onToggle={onToggle}
                    onOpacityChange={onOpacityChange}
                  />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  </MapControl>
);

export default LayerSelect;