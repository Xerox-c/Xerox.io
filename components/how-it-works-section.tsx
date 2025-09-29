import { Upload, CreditCard, Package } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Upload & Pay",
    description: "Upload your documents and pay securely online. Choose your printing preferences and shop location.",
  },
  {
    icon: CreditCard,
    title: "We Print",
    description: "Your order is sent directly to the shop. Track progress in real-time through your dashboard.",
  },
  {
    icon: Package,
    title: "Collect",
    description: "Get notified when ready. Skip the queue and collect your perfectly printed documents.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">How it Works</h2>
          <p className="text-lg text-muted-foreground text-pretty">Three simple steps to hassle-free printing</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center group-hover:bg-primary/90 transition-colors duration-300">
                <step.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-pretty">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
