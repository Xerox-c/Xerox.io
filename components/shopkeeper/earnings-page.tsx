"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CardSkeleton, TableSkeleton } from "@/components/loading-skeleton"
import { DollarSign, TrendingUp, Calendar, CreditCard } from "lucide-react"

interface Transaction {
  id: string
  orderId: string
  studentName: string
  amount: number
  date: string
  status: "completed" | "pending"
  paymentMethod: string
}

const mockTransactions: Transaction[] = [
  {
    id: "txn_001",
    orderId: "103",
    studentName: "David Kim",
    amount: 22.5,
    date: "2024-01-15T15:30:00Z",
    status: "completed",
    paymentMethod: "Credit Card",
  },
  {
    id: "txn_002",
    orderId: "102",
    studentName: "Lisa Zhang",
    amount: 28.75,
    date: "2024-01-15T14:20:00Z",
    status: "completed",
    paymentMethod: "PayPal",
  },
  {
    id: "txn_003",
    orderId: "101",
    studentName: "Alex Johnson",
    amount: 25.5,
    date: "2024-01-15T12:10:00Z",
    status: "completed",
    paymentMethod: "Campus Card",
  },
  {
    id: "txn_004",
    orderId: "100",
    studentName: "Sarah Chen",
    amount: 18.75,
    date: "2024-01-14T16:45:00Z",
    status: "completed",
    paymentMethod: "Credit Card",
  },
  {
    id: "txn_005",
    orderId: "099",
    studentName: "Mike Rodriguez",
    amount: 45.25,
    date: "2024-01-14T14:30:00Z",
    status: "completed",
    paymentMethod: "PayPal",
  },
  {
    id: "txn_006",
    orderId: "105",
    studentName: "Mike Rodriguez",
    amount: 45.25,
    date: "2024-01-15T16:45:00Z",
    status: "pending",
    paymentMethod: "Credit Card",
  },
]

export function EarningsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const loadTransactions = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setTransactions(mockTransactions)
      setIsLoading(false)
    }

    loadTransactions()
  }, [])

  const completedTransactions = transactions.filter((t) => t.status === "completed")
  const todayRevenue = completedTransactions
    .filter((t) => new Date(t.date).toDateString() === new Date().toDateString())
    .reduce((sum, t) => sum + t.amount, 0)

  const weeklyRevenue = completedTransactions
    .filter((t) => {
      const transactionDate = new Date(t.date)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return transactionDate >= weekAgo
    })
    .reduce((sum, t) => sum + t.amount, 0)

  const pendingPayout = transactions.filter((t) => t.status === "pending").reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Earnings</h1>
        <p className="text-muted-foreground">Track your revenue and transaction history</p>
      </div>

      {/* Revenue Metrics */}
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${todayRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {
                  completedTransactions.filter((t) => new Date(t.date).toDateString() === new Date().toDateString())
                    .length
                }{" "}
                orders completed today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${weeklyRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {
                  completedTransactions.filter((t) => {
                    const transactionDate = new Date(t.date)
                    const weekAgo = new Date()
                    weekAgo.setDate(weekAgo.getDate() - 7)
                    return transactionDate >= weekAgo
                  }).length
                }{" "}
                orders this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payout</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${pendingPayout.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {transactions.filter((t) => t.status === "pending").length} pending transactions
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Detailed history of all completed transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <TableSkeleton rows={6} />
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Transaction ID</th>
                      <th className="text-left py-3 px-4 font-medium">Order ID</th>
                      <th className="text-left py-3 px-4 font-medium">Student</th>
                      <th className="text-left py-3 px-4 font-medium">Amount</th>
                      <th className="text-left py-3 px-4 font-medium">Payment Method</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4 font-mono text-sm">{transaction.id}</td>
                        <td className="py-3 px-4 font-medium">#{transaction.orderId}</td>
                        <td className="py-3 px-4">{transaction.studentName}</td>
                        <td className="py-3 px-4 font-medium">${transaction.amount.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-3 w-3 text-muted-foreground" />
                            {transaction.paymentMethod}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={transaction.status === "completed" ? "secondary" : "default"}>
                            {transaction.status === "completed" ? "Completed" : "Pending"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{new Date(transaction.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {transactions.map((transaction) => (
                  <Card key={transaction.id}>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm text-muted-foreground">{transaction.id}</span>
                          <Badge variant={transaction.status === "completed" ? "secondary" : "default"}>
                            {transaction.status === "completed" ? "Completed" : "Pending"}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Order:</span>
                          <span className="font-medium">#{transaction.orderId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Student:</span>
                          <span className="font-medium">{transaction.studentName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Amount:</span>
                          <span className="font-bold">${transaction.amount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Payment:</span>
                          <span className="font-medium flex items-center gap-1">
                            <CreditCard className="h-3 w-3" />
                            {transaction.paymentMethod}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date:</span>
                          <span className="font-medium">{new Date(transaction.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
