import React from 'react';

const Button = ({onClick, className, type="button", full=false, bgColor="primary", children}) => {
    let bgClassName = 'bg-primary';
    switch (bgColor) {
        case "primary":
            bgClassName = "bg-primary";
            break;
        case "secondary":
            bgClassName = "bg-secondary";
            break;
        
        default:
            break;
    }
    return (
        <button onClick={onClick} className={`py-3 px-6 rounded-lg capitalize ${bgClassName} ${full ? "w-full" : ""} mt-auto ${className}`} type={type}>
           {children}
        </button>
    );
};

export default Button;