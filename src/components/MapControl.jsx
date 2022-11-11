import classNames from "classnames";

const MapControl = ({ children, top, right, bottom, left, className }) => (
  <div
    className={classNames(
      className,
      "map-control",
      top && "top",
      right && "right",
      bottom && "bottom",
      left && "left"
    )}
  >
    {children}
  </div>
);

export default MapControl;
