import * as React from "react";
import styles from "./input.module.css";

const Input = ({ className, type, onChange, ...props }: React.ComponentProps<"input">) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Если это поле для чисел, запрещаем ввод отрицательных значений
    if (type === "number") {
      const value = e.target.value;
      if (value.startsWith('-')) {
        return; // Игнорируем ввод, если начинается с минуса
      }
    }
    
    // Вызываем оригинальный обработчик onChange, если он передан
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <input
      type={type}
      data-slot="input"
      className={`${styles.input} ${className || ""}`.trim()}
      onChange={handleChange}
      {...props}
    />
  );
};

export default Input;
