import classNames from "classnames";

const LayerItem = (id, name, active, opacity, onToggle, onOpacityChange) => (
  <>
    <input
      id={`layer-${id}`}
      className="active"
      type="checkbox"
      value={active}
      onChange={(e) => onToggle(id, e.target.value !== "on")}
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
  </>
);

const LayerSelector = ({ groups, onToggle, onOpacityChange }) => (
  <div
    className={classNames("cesium-control", "bottom", "left", "layer-selector")}
  >
    <ul>
      {groups.map((group, i) => (
        <li key={i}>
          <ul>
            {group.map((item, j) => (
              <li>
                <LayerItem
                  id={i}
                  name={item.name}
                  active={item.active}
                  opacity={item.opacity}
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
);

export default LayerSelector;
