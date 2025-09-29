import { NewOrderForm } from "@/components/student/new-order-form"
import { StudentLayout } from "@/components/student/student-layout"

export default function NewOrderPage() {
  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Place New Order</h1>
          <p className="text-muted-foreground">Upload your documents and customize your printing preferences</p>
        </div>
        <NewOrderForm />
      </div>
    </StudentLayout>
  )
}
