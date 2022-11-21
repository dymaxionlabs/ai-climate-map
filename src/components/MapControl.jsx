import classNames from "classnames";

const MapControl = ({ children, className }) => (
  <div className={classNames(className, "map-control")}>{children}</div>
);

export default MapControl;
