const LocationSelector = ({ items, value, onChange }) => (
  <div className="location-selector">
    <span>
      Select a known location to explore:
    </span>
    <select onChange={(e) => onChange(e.target.value)}>
      {items.map((item, i) => (
        <option key={i} value={i} selected={value === i}>{item.name}</option>
      ))}
    </select>
  </div>
)

export default LocationSelector