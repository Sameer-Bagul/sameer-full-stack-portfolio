import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GlassButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'accent';
}

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    const variantClasses = {
      primary: 'glass-button-primary',
      secondary: 'glass-button-secondary',
      accent: 'glass-button-accent'
    };

    return (
      <Button
        ref={ref}
        className={cn(
          "glass-button",
          variantClasses[variant],
          "group relative overflow-hidden font-medium transition-all duration-300 hover:scale-105 active:scale-95 text-white",
          className
        )}
        {...props}
      >
        {/* Content */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </Button>
    );
  }
);

GlassButton.displayName = "GlassButton";