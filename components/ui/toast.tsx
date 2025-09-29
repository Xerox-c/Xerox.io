"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ToastProps {
  id: string
  title?: string
  description?: string
  variant?: "default" | "success" | "warning" | "destructive"
  duration?: number
  onClose?: () => void
}

export function Toast({ title, description, variant = "default", onClose }: Omit<ToastProps, "id">) {
  const [isVisible, setIsVisible] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onClose?.(), 300)
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose?.(), 300)
  }

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 w-full max-w-sm rounded-lg border p-4 shadow-lg transition-all duration-300",
        "animate-slide-up",
        {
          "bg-card text-card-foreground border-border": variant === "default",
          "bg-success text-success-foreground border-success": variant === "success",
          "bg-warning text-warning-foreground border-warning": variant === "warning",
          "bg-destructive text-destructive-foreground border-destructive": variant === "destructive",
          "opacity-0 translate-x-full": !isVisible,
          "opacity-100 translate-x-0": isVisible,
        },
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          {title && <div className="font-medium text-sm mb-1">{title}</div>}
          {description && <div className="text-sm opacity-90">{description}</div>}
        </div>
        <button onClick={handleClose} className="opacity-70 hover:opacity-100 transition-opacity">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  )
}
