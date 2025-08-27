import * as React from "react";
import styles from "./input.module.css";

const Input = ({ className, type, ...props }: React.ComponentProps<"input">) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={`${styles.input} ${className || ""}`.trim()}
      {...props}
    />
  );
};

export default Input;
