import React, { forwardRef } from "react";
import "./crucigrama.css";

const Celda = forwardRef(
  ({ value, activa, disabled, error, mostrarSolucion, onChange, onClick, onKeyDown }, ref) => {
    let clase = "celda";
    if (disabled) clase += " bloqueada";
    else if (error) clase += " error";
    else if (activa) clase += " activa";

    return (
      <input
        ref={ref}
        type="text"
        className={clase}
        value={value}
        disabled={disabled || mostrarSolucion}
        onChange={onChange}
        onClick={onClick}
        onKeyDown={onKeyDown}
        maxLength={1}
        autoComplete="off"
        inputMode="text"
      />
    );
  }
);

export default Celda;
