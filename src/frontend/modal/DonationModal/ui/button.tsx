import * as React from "react";
import styles from "./button.module.css";

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? "button" : "button";

  const getVariantClass = () => {
    switch (variant) {
      case "destructive": return styles.buttonDestructive;
      case "outline": return styles.buttonOutline;
      case "secondary": return styles.buttonSecondary;
      case "ghost": return styles.buttonGhost;
      case "link": return styles.buttonLink;
      default: return styles.buttonDefault;
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "sm": return styles.buttonSm;
      case "lg": return styles.buttonLg;
      case "icon": return styles.buttonIcon;
      default: return styles.buttonDefaultSize;
    }
  };

  const buttonClass = `${styles.button} ${getVariantClass()} ${getSizeClass()} ${className || ""}`.trim();

  return (
    <Comp
      data-slot="button"
      className={buttonClass}
      {...props}
    />
  );
}

export { Button };
