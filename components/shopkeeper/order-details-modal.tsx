"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { User, FileText, DollarSign, Copy, Palette, Paperclip, Download, Hash, CheckCircle2 } from "lucide-react"

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
  printSides?: "single" | "double"
  pageRanges?: string
  specialInstructions?: string
  createdAt: string
  orderToken?: string
}

interface OrderDetailsModalProps {
  order: Order | null
  isOpen: boolean
  onClose: () => void
  onStatusChange: (orderId: string, newStatus: Order["status"]) => void
}

export function OrderDetailsModal({ order, isOpen, onClose, onStatusChange }: OrderDetailsModalProps) {
  if (!order) return null

  const getNextStatus = (currentStatus: Order["status"]): Order["status"] | null => {
    switch (currentStatus) {
      case "new":
        return "in-progress"
      case "in-progress":
        return "ready"
      case "ready":
        return "completed"
      case "completed":
        return null
    }
  }

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "new":
        return "New Order"
      case "in-progress":
        return "In Progress"
      case "ready":
        return "Ready for Pickup"
      case "completed":
        return "Completed"
    }
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "new":
        return "secondary"
      case "in-progress":
        return "default"
      case "ready":
        return "destructive"
      case "completed":
        return "outline"
    }
  }

  const handleFileDownload = () => {
    // Simulate file download
    const link = document.createElement("a")
    link.href = `/api/files/download/${order.id}` // This would be the actual API endpoint
    link.download = order.fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const nextStatus = getNextStatus(order.status)
  const orderToken = order.orderToken || `PQ${order.id.padStart(6, "0")}`

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Order #{order.id}</DialogTitle>
            <Badge variant={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
          </div>
          <DialogDescription>Complete order details and printing instructions</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Order Token: {orderToken}</span>
            </div>
            <p className="text-xs text-primary/80 mt-1">Customer reference code for pickup</p>
          </div>

          {/* Customer Information */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <User className="h-4 w-4" />
              Customer Information
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Student Name:</span>
                <p className="font-medium">{order.studentName}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Order Date:</span>
                <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* File Information */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4" />
              File Information
            </h3>
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{order.fileName}</p>
                  <p className="text-sm text-muted-foreground mt-1">Document ready for printing</p>
                  {order.pageRanges && order.pageRanges !== "all" && (
                    <p className="text-sm text-muted-foreground">Pages: {order.pageRanges}</p>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleFileDownload}
                  className="hover:scale-105 transition-transform duration-200 bg-transparent"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Print Specifications */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Copy className="h-4 w-4" />
              Print Specifications
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Copies:</span>
                <p className="font-medium">{order.copies}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Paper Size:</span>
                <p className="font-medium">{order.paperSize}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Color Type:</span>
                <p className="font-medium flex items-center gap-1">
                  <Palette className="h-3 w-3" />
                  {order.colorType === "color" ? "Color" : "Black & White"}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Binding:</span>
                <p className="font-medium flex items-center gap-1">
                  <Paperclip className="h-3 w-3" />
                  {order.binding === "none" ? "No Binding" : order.binding}
                </p>
              </div>
              {order.printSides && (
                <div>
                  <span className="text-muted-foreground">Print Sides:</span>
                  <p className="font-medium">{order.printSides === "single" ? "Single-sided" : "Double-sided"}</p>
                </div>
              )}
            </div>
          </div>

          {order.specialInstructions && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="font-semibold">Special Instructions</h3>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm">{order.specialInstructions}</p>
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Payment Information */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Payment Information
            </h3>
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Amount:</span>
                <span className="text-lg font-bold">${order.totalAmount.toFixed(2)}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Payment confirmed</p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {nextStatus && (
            <Button
              onClick={() => onStatusChange(order.id, nextStatus)}
              className="hover:scale-105 transition-transform duration-200"
            >
              {nextStatus === "in-progress" && "Start Printing"}
              {nextStatus === "ready" && "Mark as Ready"}
              {nextStatus === "completed" && (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark as Completed
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
