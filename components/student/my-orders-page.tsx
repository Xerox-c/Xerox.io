"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { TableSkeleton } from "@/components/loading-skeleton"
import { Search, FileText, Plus } from "lucide-react"
import Link from "next/link"

interface Order {
  id: string
  fileName: string
  status: "pending" | "in-progress" | "ready" | "completed"
  shopName: string
  totalAmount: number
  createdAt: string
  completedAt?: string
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
    status: "completed",
    shopName: "Campus Copy Center",
    totalAmount: 12.0,
    createdAt: "2024-01-14T16:45:00Z",
    completedAt: "2024-01-15T09:15:00Z",
  },
  {
    id: "104",
    fileName: "Lab_Manual.pdf",
    status: "completed",
    shopName: "Student Services Print",
    totalAmount: 45.25,
    createdAt: "2024-01-13T11:20:00Z",
    completedAt: "2024-01-14T14:30:00Z",
  },
  {
    id: "105",
    fileName: "Thesis_Draft.docx",
    status: "pending",
    shopName: "Quick Print Shop",
    totalAmount: 67.8,
    createdAt: "2024-01-15T17:10:00Z",
  },
]

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

export function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Orders</h1>
          <p className="text-muted-foreground mt-1">Track and manage all your print orders</p>
        </div>
        <Button asChild className="hover:scale-105 transition-transform duration-200">
          <Link href="/student/new-order">
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders by file name, shop, or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
          >
            All
          </Button>
          <Button
            variant={statusFilter === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("pending")}
          >
            Pending
          </Button>
          <Button
            variant={statusFilter === "in-progress" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("in-progress")}
          >
            In Progress
          </Button>
          <Button
            variant={statusFilter === "ready" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("ready")}
          >
            Ready
          </Button>
          <Button
            variant={statusFilter === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("completed")}
          >
            Completed
          </Button>
        </div>
      </div>

      {/* Orders List */}
      {isLoading ? (
        <TableSkeleton rows={5} />
      ) : filteredOrders.length === 0 ? (
        // Empty State
        <Card className="text-center py-12">
          <CardContent className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {searchTerm || statusFilter !== "all" ? "No orders found" : "You haven't placed any orders yet."}
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Place your first order to get started with PrintQueue."}
              </p>
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
        <div className="space-y-4">
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>
                  {filteredOrders.length} order{filteredOrders.length !== 1 ? "s" : ""} found
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Order ID</th>
                        <th className="text-left py-3 px-4 font-medium">File Name</th>
                        <th className="text-left py-3 px-4 font-medium">Shop</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                        <th className="text-left py-3 px-4 font-medium">Amount</th>
                        <th className="text-left py-3 px-4 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-muted/50 transition-colors">
                          <td className="py-3 px-4 font-medium">#{order.id}</td>
                          <td className="py-3 px-4">{order.fileName}</td>
                          <td className="py-3 px-4">{order.shopName}</td>
                          <td className="py-3 px-4">
                            <Badge variant={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                          </td>
                          <td className="py-3 px-4">${order.totalAmount.toFixed(2)}</td>
                          <td className="py-3 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <Badge variant={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                  </div>
                  <CardDescription className="font-medium">{order.fileName}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
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
                  {order.completedAt && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Completed:</span>
                      <span className="font-medium">{new Date(order.completedAt).toLocaleDateString()}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
