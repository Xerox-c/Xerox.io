"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CardSkeleton } from "@/components/loading-skeleton"
import { OrderDetailsModal } from "@/components/shopkeeper/order-details-modal"
import { Clock, FileText, Package, User, Calendar, DollarSign, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Order {
  id: string
  studentName: string
  fileName: string
  status: "new" | "in-progress" | "ready" | "completed"
  totalAmount: number
  copies: number
  paperSize: string
  colorType: string
  binding: string
  specialInstructions?: string
  createdAt: string
}

const mockOrders: Order[] = [
  {
    id: "106",
    studentName: "Alex Johnson",
    fileName: "Assignment_Report.pdf",
    status: "new",
    totalAmount: 25.5,
    copies: 3,
    paperSize: "A4",
    colorType: "black-white",
    binding: "staple",
    createdAt: "2024-01-15T18:30:00Z",
  },
  {
    id: "107",
    studentName: "Sarah Chen",
    fileName: "Research_Presentation.pptx",
    status: "new",
    totalAmount: 18.75,
    copies: 1,
    paperSize: "A4",
    colorType: "color",
    binding: "none",
    specialInstructions: "Please print slides 2 per page",
    createdAt: "2024-01-15T19:15:00Z",
  },
  {
    id: "105",
    studentName: "Mike Rodriguez",
    fileName: "Lab_Manual.pdf",
    status: "in-progress",
    totalAmount: 45.25,
    copies: 2,
    paperSize: "A4",
    colorType: "black-white",
    binding: "spiral",
    createdAt: "2024-01-15T16:45:00Z",
  },
  {
    id: "104",
    studentName: "Emma Wilson",
    fileName: "Thesis_Chapter.docx",
    status: "in-progress",
    totalAmount: 32.0,
    copies: 1,
    paperSize: "A4",
    colorType: "black-white",
    binding: "comb",
    createdAt: "2024-01-15T14:20:00Z",
  },
  {
    id: "103",
    studentName: "David Kim",
    fileName: "Project_Report.pdf",
    status: "ready",
    totalAmount: 22.5,
    copies: 2,
    paperSize: "A4",
    colorType: "black-white",
    binding: "staple",
    createdAt: "2024-01-15T12:10:00Z",
  },
  {
    id: "102",
    studentName: "Lisa Zhang",
    fileName: "Marketing_Plan.pptx",
    status: "ready",
    totalAmount: 28.75,
    copies: 1,
    paperSize: "A4",
    colorType: "color",
    binding: "none",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "101",
    studentName: "John Smith",
    fileName: "Final_Project.pdf",
    status: "completed",
    totalAmount: 35.0,
    copies: 2,
    paperSize: "A4",
    colorType: "black-white",
    binding: "spiral",
    createdAt: "2024-01-14T15:30:00Z",
  },
  {
    id: "100",
    studentName: "Maria Garcia",
    fileName: "Research_Paper.docx",
    status: "completed",
    totalAmount: 15.25,
    copies: 1,
    paperSize: "A4",
    colorType: "black-white",
    binding: "staple",
    createdAt: "2024-01-14T11:20:00Z",
  },
]

const columns = [
  { id: "new", title: "New Orders", icon: Clock, color: "text-blue-600" },
  { id: "in-progress", title: "In Progress", icon: FileText, color: "text-yellow-600" },
  { id: "ready", title: "Ready for Pickup", icon: Package, color: "text-green-600" },
  { id: "completed", title: "Completed", icon: CheckCircle2, color: "text-gray-600" },
] as const

export function ShopkeeperDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
    setIsModalOpen(false)
  }

  const getOrdersByStatus = (status: Order["status"]) => {
    return orders.filter((order) => order.status === status)
  }

  const todayRevenue = orders
    .filter((order) => order.status === "ready" || order.status === "completed")
    .reduce((sum, order) => sum + order.totalAmount, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Order Management</h1>
        <p className="text-muted-foreground">Manage and track all print orders</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">New Orders</p>
                <p className="text-2xl font-bold">{getOrdersByStatus("new").length}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{getOrdersByStatus("in-progress").length}</p>
              </div>
              <FileText className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ready</p>
                <p className="text-2xl font-bold">{getOrdersByStatus("ready").length}</p>
              </div>
              <Package className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{getOrdersByStatus("completed").length}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Revenue</p>
                <p className="text-2xl font-bold">${todayRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      {isLoading ? (
        <div className="grid gap-6 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="hidden lg:grid lg:grid-cols-4 gap-6">
            {columns.map((column) => {
              const columnOrders = getOrdersByStatus(column.id)
              return (
                <Card key={column.id} className="h-fit">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <column.icon className={cn("h-5 w-5", column.color)} />
                      {column.title}
                      <Badge variant="secondary" className="ml-auto">
                        {columnOrders.length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {columnOrders.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <column.icon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No {column.title.toLowerCase()}</p>
                      </div>
                    ) : (
                      columnOrders.map((order) => (
                        <Card
                          key={order.id}
                          className="cursor-pointer hover:shadow-md transition-shadow duration-200 hover:scale-[1.02]"
                          onClick={() => handleOrderClick(order)}
                        >
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">#{order.id}</span>
                                <span className="text-sm text-muted-foreground">${order.totalAmount.toFixed(2)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <User className="h-3 w-3 text-muted-foreground" />
                                <span className="text-sm">{order.studentName}</span>
                              </div>
                              <p className="text-sm font-medium text-foreground truncate">{order.fileName}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {new Date(order.createdAt).toLocaleDateString()}
                              </div>
                              <div className="flex gap-1 text-xs">
                                <Badge variant="outline">{order.copies} copies</Badge>
                                <Badge variant="outline">{order.paperSize}</Badge>
                                <Badge variant="outline">{order.colorType === "color" ? "Color" : "B&W"}</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Mobile Stacked View */}
          <div className="lg:hidden space-y-6">
            {columns.map((column) => {
              const columnOrders = getOrdersByStatus(column.id)
              return (
                <Card key={column.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <column.icon className={cn("h-5 w-5", column.color)} />
                      {column.title}
                      <Badge variant="secondary" className="ml-auto">
                        {columnOrders.length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {columnOrders.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <column.icon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No {column.title.toLowerCase()}</p>
                      </div>
                    ) : (
                      columnOrders.map((order) => (
                        <Card
                          key={order.id}
                          className="cursor-pointer hover:shadow-md transition-shadow duration-200"
                          onClick={() => handleOrderClick(order)}
                        >
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">Order #{order.id}</span>
                                <span className="text-sm text-muted-foreground">${order.totalAmount.toFixed(2)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <User className="h-3 w-3 text-muted-foreground" />
                                <span className="text-sm">{order.studentName}</span>
                              </div>
                              <p className="text-sm font-medium text-foreground">{order.fileName}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {new Date(order.createdAt).toLocaleDateString()}
                              </div>
                              <div className="flex flex-wrap gap-1 text-xs">
                                <Badge variant="outline">{order.copies} copies</Badge>
                                <Badge variant="outline">{order.paperSize}</Badge>
                                <Badge variant="outline">{order.colorType === "color" ? "Color" : "B&W"}</Badge>
                                {order.binding !== "none" && <Badge variant="outline">{order.binding}</Badge>}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </>
      )}

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStatusChange={handleStatusChange}
      />
    </div>
  )
}
