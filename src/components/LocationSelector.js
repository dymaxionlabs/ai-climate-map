import classNames from "classnames";

const LocationSelector = ({ items, value, onChange }) => (
  <div
    className={classNames("cesium-control", "top", "left", "location-selector")}
  >
    <span>Select a known location to explore:</span>
    <select onChange={(e) => onChange(e.target.value)} value={value}>
      {items.map((item, i) => (
        <option key={i} value={i}>
          {item.name}
        </option>
      ))}
    </select>
  </div>
);

export default LocationSelector;
