"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { Toast, type ToastProps } from "@/components/ui/toast"

interface ToastContextType {
  showToast: (toast: Omit<ToastProps, "id" | "onClose">) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

interface ToastProviderProps {
  children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<(ToastProps & { id: string })[]>([])

  const showToast = useCallback((toast: Omit<ToastProps, "id" | "onClose">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = {
      ...toast,
      id,
      onClose: () => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      },
    }
    setToasts((prev) => [...prev, newToast])
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
