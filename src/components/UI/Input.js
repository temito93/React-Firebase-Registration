import React from "react";

const Input = ({
  htmlFor,
  labelName,
  checked,
  type,
  value,
  name,
  onChange,
  style,
  className,
}) => {
  return (
    <div className={className}>
      <label htmlFor={htmlFor}>{labelName}</label>
      <input
        checked={checked}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        style={style}
      />
    </div>
  );
};

export default Input;
