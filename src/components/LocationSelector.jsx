import MapControl from "./MapControl";

const LocationSelector = ({ items, value, onChange }) => (
  <MapControl className="location-selector" top left>
    <span>Select a known location to explore:</span>
    <select onChange={(e) => onChange(e.target.value)} value={value}>
      {items.map((item, i) => (
        <option key={i} value={i}>
          {item.name}
        </option>
      ))}
    </select>
  </MapControl>
);

export default LocationSelector;
