import classNames from 'classnames'

const LayerSelector = ({ items, onToggle, onOpacityChange }) => (
  <div className={classNames("cesium-control", "bottom", "left", "layer-selector")}>
    <ul>
      {items.map((item, i) => (
        <li key={i}>
          <input
            id={`layer-${i}`}
            className="active"
            type="checkbox"
            value={item.active}
            onChange={(e) => onToggle(i, e.target.value !== "on")}
          />
          <label htmlFor={`layer-${i}`} className="name">{item.name}</label>
          <input
            className="opacity-slider"
            type="range"
            min="0"
            max="100"
            onChange={(e) => onOpacityChange(i, e.target.value)}
            value={item.opacity} />
        </li>
      ))}
    </ul>
  </div>
)

export default LayerSelector