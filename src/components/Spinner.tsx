import clsx from "clsx";
import React from "react";

interface Props {
  color?: "primary" | "light";
}

const Spinner = ({ color = "primary" }: Props) => {
  return (
    <div
      className={clsx([
        "animate-spin border-4 w-6 h-6 rounded-full",
        color === "primary" && "border-t-primary border-primary/20",
        color === "light" && "border-t-light border-light/20",
      ])}
    ></div>
  );
};

export default Spinner;
