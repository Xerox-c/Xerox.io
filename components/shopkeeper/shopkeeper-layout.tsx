"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { Menu, X, LayoutDashboard, DollarSign, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

interface ShopkeeperLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: "Dashboard", href: "/shopkeeper/dashboard", icon: LayoutDashboard },
  { name: "Earnings", href: "/shopkeeper/earnings", icon: DollarSign },
]

export function ShopkeeperLayout({ children }: ShopkeeperLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      message: "New order #106 received from Alex Johnson",
      type: "order_progress" as const,
      read: false,
      createdAt: "2024-01-15T18:30:00Z",
    },
    {
      id: "2",
      message: "Order #105 payment confirmed",
      type: "payment" as const,
      read: true,
      createdAt: "2024-01-15T16:45:00Z",
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
            <Link href="/shopkeeper/dashboard" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <div className="h-4 w-4 bg-primary-foreground rounded-sm" />
              </div>
              <div>
                <span className="text-xl font-bold text-foreground">PrintQueue</span>
                <span className="text-xs text-muted-foreground block">Shopkeeper Portal</span>
              </div>
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

              {/* Profile */}
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">Campus Copy Center</span>
              </div>

              {/* Logout button to desktop view */}
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
                <div className="px-3 py-2 border-t">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">Campus Copy Center</span>
                  </div>
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
