import classNames from "classnames";

const MapControlGroup = ({ children, top, right, bottom, left, className }) => (
  <div
    className={classNames(
      className,
      "map-control-group",
      top && "top",
      right && "right",
      bottom && "bottom",
      left && "left"
    )}
  >
    {children}
  </div>
);

export default MapControlGroup;
