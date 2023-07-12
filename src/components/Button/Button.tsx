import React, { Children } from "react";
import styles from "./Button.module.css";
interface props {
  children: string;
  onClick: () => void;
  color: string;
}
const Button = ({ children, onClick, color = "primary" }: props) => {
  return (
    <button
      className={[styles.btn, styles["btn-" + color]].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
