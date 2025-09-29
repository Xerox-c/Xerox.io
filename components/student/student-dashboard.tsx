"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CardSkeleton } from "@/components/loading-skeleton"
import { Plus, FileText, Clock, CheckCircle, Package } from "lucide-react"

interface Order {
  id: string
  fileName: string
  status: "pending" | "in-progress" | "ready" | "completed"
  shopName: string
  totalAmount: number
  createdAt: string
}

const mockOrders: Order[] = [
  {
    id: "101",
    fileName: "Assignment_Report.pdf",
    status: "ready",
    shopName: "Campus Copy Center",
    totalAmount: 25.5,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "102",
    fileName: "Research_Paper.docx",
    status: "in-progress",
    shopName: "Quick Print Shop",
    totalAmount: 18.75,
    createdAt: "2024-01-15T14:20:00Z",
  },
  {
    id: "103",
    fileName: "Presentation_Slides.pptx",
    status: "pending",
    shopName: "Campus Copy Center",
    totalAmount: 12.0,
    createdAt: "2024-01-15T16:45:00Z",
  },
]

const getStatusIcon = (status: Order["status"]) => {
  switch (status) {
    case "pending":
      return <Clock className="h-4 w-4" />
    case "in-progress":
      return <FileText className="h-4 w-4" />
    case "ready":
      return <Package className="h-4 w-4" />
    case "completed":
      return <CheckCircle className="h-4 w-4" />
  }
}

const getStatusColor = (status: Order["status"]) => {
  switch (status) {
    case "pending":
      return "secondary"
    case "in-progress":
      return "default"
    case "ready":
      return "destructive"
    case "completed":
      return "secondary"
  }
}

const getStatusText = (status: Order["status"]) => {
  switch (status) {
    case "pending":
      return "Pending"
    case "in-progress":
      return "In Progress"
    case "ready":
      return "Ready for Pickup"
    case "completed":
      return "Completed"
  }
}

export function StudentDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [studentName] = useState("Alex Johnson") // This would come from auth context

  useEffect(() => {
    // Simulate API call
    const loadOrders = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setOrders(mockOrders)
      setIsLoading(false)
    }

    loadOrders()
  }, [])

  const activeOrders = orders.filter((order) => order.status !== "completed")

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Hello, {studentName}!</h1>
          <p className="text-muted-foreground mt-1">Ready to place your next print order?</p>
        </div>
        <Button asChild size="lg" className="hover:scale-105 transition-transform duration-200">
          <Link href="/student/new-order">
            <Plus className="h-5 w-5 mr-2" />
            Place a New Print Order
          </Link>
        </Button>
      </div>

      {/* Active Orders Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Active Orders</h2>
          {!isLoading && activeOrders.length > 0 && (
            <Button asChild variant="outline">
              <Link href="/student/orders">View All Orders</Link>
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : activeOrders.length === 0 ? (
          // Empty State
          <Card className="text-center py-12">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Your queue is empty!</h3>
                <p className="text-muted-foreground mb-4">Place your first order to get started.</p>
                <Button asChild>
                  <Link href="/student/new-order">
                    <Plus className="h-4 w-4 mr-2" />
                    Place a New Order
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <Badge variant={getStatusColor(order.status)} className="flex items-center gap-1">
                      {getStatusIcon(order.status)}
                      {getStatusText(order.status)}
                    </Badge>
                  </div>
                  <CardDescription className="font-medium">{order.fileName}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shop:</span>
                    <span className="font-medium">{order.shopName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-medium">${order.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ordered:</span>
                    <span className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  {order.status === "ready" && (
                    <div className="pt-2">
                      <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <p className="text-sm font-medium text-destructive">Ready for pickup!</p>
                        <p className="text-xs text-destructive/80 mt-1">
                          Visit {order.shopName} to collect your order.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
