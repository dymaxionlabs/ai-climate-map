import MapControl from "./MapControl";

const LocationSelect = ({ items, value, onChange }) => (
  <MapControl className="location-selector">
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

export default LocationSelect;
