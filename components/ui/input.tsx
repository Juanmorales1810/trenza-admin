import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    const ariaInvalid = props["aria-invalid"]
    return (
      <input
        type={type}
        className={cn(
          type === "file" ? "flex h-9 w-full text-sm font-medium text-foreground border rounded-lg cursor-pointer focus:outline-none border-input bg-transparent shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 file:bg-transparent" :
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          ariaInvalid === "true" ? "border-destructive ring-destructive placeholder:text-destructive text-destructive focus-visible:ring-destructive bg-destructive/10" : "",

          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
