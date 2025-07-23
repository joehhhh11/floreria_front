import React from 'react';

function Button({ children, onClick, type = 'button', className = '', disabled = false }) {
  return (
    <div className="bg-transparent border-flor p-2 border-2 rounded">
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`
          px-4 py-2 rounded 
          bg-flor text-black 
          hover:bg-flor/80 
          active:scale-95 
          transition duration-150 ease-in-out 
          disabled:opacity-50 
          ${className}
        `}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
