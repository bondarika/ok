import { ReactElement } from "react";
import classNames from "classnames";
import { CounterProps } from "./types";
import "./Counter.styl";

function Counter({
  value,
  variant = "primary",
  size = 8,
  stroke = true,
  pulse = false,
}: CounterProps): ReactElement {
  const formattedValue =
    size !== 8 && size !== 12
      ? !isNaN(Number(value))
        ? Number(value) > 99
          ? "99+"
          : value
        : typeof value === "string"
        ? value.substring(0, 3)
        : null
      : null;

  const mergedClassName = classNames(
    "counter",
    `counter_${variant}`,
    `counter_${size}`,
    pulse && (size === 8 || size === 12) ? `counter_pulse_${variant}` : null
  );

  const container = classNames(
    "counter",
    `counter_${variant}`,
    stroke ? `counter_${size}_stroke` : null
  );

  return (
    <div className={container}>
      <div className={mergedClassName}>{formattedValue}</div>
    </div>
  );
}

export default Counter;
