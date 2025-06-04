import React from "react";

const Input = ({
  id,
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon, 
  className = "",
}) => {
  return (
    <div className="relative  p-4 rounded-lg w-full">
      <div className="relative ">
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder || label}
          className={`peer bg-transparent h-10 w-full rounded-lg text-gray-900 placeholder-transparent ring-1 px-2 ring-gray-400 focus:ring-sky-600 focus:outline-none focus:border-rose-600 ${className}`}
        />
        <label
          htmlFor={id}
          className="absolute flex items-center gap-1 cursor-text left-0 -top-3 text-sm text-gray-500 bg-flor-2 mx-1 px-1 
                     peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
                     peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 
                     peer-focus:text-sm transition-all"
        >
          {Icon && <Icon className="w-4 h-4 text-gray-500" />}
          {label}
        </label>
      </div>
    </div>
  );
};

export default Input;
