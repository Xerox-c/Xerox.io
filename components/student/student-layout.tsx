"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { Plus, Menu, X, FileText, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

interface StudentLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: "Dashboard", href: "/student/dashboard", icon: User },
  { name: "My Orders", href: "/student/orders", icon: FileText },
]

export function StudentLayout({ children }: StudentLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      message: "Your order #101 is now ready for pickup",
      type: "order_ready" as const,
      read: false,
      createdAt: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      message: "Order #100 has been completed",
      type: "order_progress" as const,
      read: true,
      createdAt: "2024-01-15T09:15:00Z",
    },
  ])
  const pathname = usePathname()

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/student/dashboard" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <div className="h-4 w-4 bg-primary-foreground rounded-sm" />
              </div>
              <span className="text-xl font-bold text-foreground">PrintQueue</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 text-sm font-medium transition-colors duration-200",
                    pathname === item.href ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <NotificationsDropdown
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
              />

              <ThemeToggle />

              {/* New Order Button - Desktop */}
              <Button asChild className="hidden md:flex hover:scale-105 transition-transform duration-200">
                <Link href="/student/new-order">
                  <Plus className="h-4 w-4 mr-2" />
                  New Order
                </Link>
              </Button>

              {/* Logout Button - Desktop */}
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                onClick={() => {
                  // Handle logout logic here
                  console.log("Logging out...")
                  window.location.href = "/login"
                }}
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>

              {/* Mobile menu toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden animate-fade-in">
              <div className="px-2 pt-2 pb-3 space-y-1 border-t">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors duration-200",
                      pathname === item.href
                        ? "text-foreground bg-muted"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
                <div className="px-3 py-2">
                  <Button asChild className="w-full">
                    <Link href="/student/new-order">
                      <Plus className="h-4 w-4 mr-2" />
                      New Order
                    </Link>
                  </Button>
                </div>
                <div className="px-3 py-2">
                  <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  )
}
