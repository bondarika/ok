import { ReactElement, useState } from "react";
import classNames from "classnames";
import { ButtonProps } from "./types";
import Counter from "../Counter/Counter";
import "./Button.styl";

function Button({
  children,
  variant = "primary",
  size = 36,
  state = "enabled",
  counter,
  focused = false,
  className,
  label,
  type,
  ...others
}: ButtonProps): ReactElement {
  const [isAnimating, setIsAnimating] = useState(false);

  const buttonStyle = {
    padding: `${size === 28 ? "9.3px" : size === 36 ? "12px" : "16px"}`,
    borderRadius: `${size === 28 ? "4px" : size === 36 ? "6px" : "8px"}`,
  };

  const mergedClassNames = classNames(
    "button",
    `button_${variant}`,
    `button_${size}`,
    `button_${state}`,
    focused && "button_focused",
    counter && "button_with_counter",
    isAnimating && "button_loading",
    className
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (state === "disabled") {
      event.preventDefault();
      return;
    }
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 3000);
  };

  return (
    <button
      className={mergedClassNames}
      type={type || "button"}
      style={buttonStyle}
      onClick={handleClick}
      {...others}
      disabled={state === "disabled"}
    >
      {isAnimating ? (
        <>
          <div
            className="content_group"
            style={{
              visibility: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: `${size === 28 ? "4px" : size === 36 ? "6px" : "8px"}`,
            }}
          >
            <span className="button_label">{label}</span>
            {counter && (
              <Counter
                variant={variant}
                size={size === 28 ? 16 : size === 36 ? 20 : 24}
              />
            )}
          </div>
          <div style={{position: 'absolute'}}>
            <div className="progressIndicator" />
          </div>

          <div className="shimmer" />
        </>
      ) : (
        <>
          <div
            className="content_group"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: `${size === 28 ? "4px" : size === 36 ? "6px" : "8px"}`,
            }}
          >
            <span className="button_label">{label}</span>
            {counter && (
              <Counter
                variant={variant}
                size={size === 28 ? 16 : size === 36 ? 20 : 24}
              />
            )}
          </div>
        </>
      )}
    </button>
  );
}

export default Button;
