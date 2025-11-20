import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost';
  size?: 'sm' | 'md';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-900 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      default: "bg-neutral-900 text-white hover:bg-neutral-700",
      ghost: "hover:bg-neutral-100 text-neutral-900"
    };
    
    const sizes = {
      sm: "px-3 py-1.5",
      md: "px-4 py-2"
    };
    
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
