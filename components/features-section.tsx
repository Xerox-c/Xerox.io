import { Clock, BarChart3, Shield, Smartphone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const studentFeatures = [
  {
    icon: Clock,
    title: "Save Time",
    description: "No more waiting in long queues. Upload, pay, and collect when ready.",
  },
  {
    icon: Smartphone,
    title: "Easy Tracking",
    description: "Real-time updates on your order status through our mobile-friendly dashboard.",
  },
]

const shopFeatures = [
  {
    icon: BarChart3,
    title: "Organized Orders",
    description: "Manage all print orders efficiently with our intuitive Kanban-style dashboard.",
  },
  {
    icon: Shield,
    title: "Digital Payments",
    description: "Secure online payments with automatic transaction tracking and reporting.",
  },
]

export function FeaturesSection() {
  return (
    <section id="for-shops" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">Built for Everyone</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Streamlined solutions for students and shop owners
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Student Features */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">For Students</h3>
            <div className="space-y-6">
              {studentFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Shop Features */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">For Shops</h3>
            <div className="space-y-6">
              {shopFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
