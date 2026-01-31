import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', children, ...props }, ref) => {
    const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-300'
    const variants = {
      primary: 'bg-phantom hover:bg-phantom/80 text-white ghost-glow hover:ghost-glow-strong',
      secondary: 'bg-wisp hover:bg-wisp/80 text-void',
      ghost: 'border border-phantom/50 hover:border-phantom text-spectral hover:text-white',
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
