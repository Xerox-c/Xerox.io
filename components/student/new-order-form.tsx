"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, CreditCard, CheckCircle, X, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormData {
  files: File[]
  shopId: string
  copies: number
  paperSize: string
  colorType: string
  binding: string
  printSides: "single" | "double"
  pageRanges: { [fileName: string]: string }
  specialInstructions: string
  paymentMethod: string
}

const shops = [
  { id: "1", name: "Campus Copy Center", location: "Main Building, Ground Floor" },
  { id: "2", name: "Quick Print Shop", location: "Library Building, 2nd Floor" },
  { id: "3", name: "Student Services Print", location: "Student Center, Room 101" },
]

const steps = [
  { id: 1, name: "Upload Files", icon: Upload },
  { id: 2, name: "Print Options", icon: FileText },
  { id: 3, name: "Payment", icon: CreditCard },
  { id: 4, name: "Confirmation", icon: CheckCircle },
]

export function NewOrderForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    files: [],
    shopId: "",
    copies: 1,
    paperSize: "A4",
    colorType: "black-white",
    binding: "none",
    printSides: "single",
    pageRanges: {},
    specialInstructions: "",
    paymentMethod: "",
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadError(null)

    // Simulate file validation
    const invalidFiles = files.filter((file) => file.size > 10 * 1024 * 1024) // 10MB limit
    if (invalidFiles.length > 0) {
      setUploadError("Some files are too large. Maximum file size is 10MB.")
      return
    }

    const newPageRanges = { ...formData.pageRanges }
    files.forEach((file) => {
      if (!newPageRanges[file.name]) {
        newPageRanges[file.name] = "all"
      }
    })

    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...files],
      pageRanges: newPageRanges,
    }))
  }

  const removeFile = (index: number) => {
    const fileToRemove = formData.files[index]
    const newPageRanges = { ...formData.pageRanges }
    delete newPageRanges[fileToRemove.name]

    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
      pageRanges: newPageRanges,
    }))
  }

  const calculateTotal = () => {
    const basePrice = formData.colorType === "color" ? 0.5 : 0.1
    const bindingPrice = formData.binding === "spiral" ? 2.0 : formData.binding === "comb" ? 1.5 : 0
    const sidesMultiplier = formData.printSides === "double" ? 0.8 : 1.0
    const totalPages = formData.files.length * 5 // Assume 5 pages per file for demo
    return (basePrice * totalPages * formData.copies * sidesMultiplier + bindingPrice).toFixed(2)
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)

    // Show success toast and redirect
    router.push("/student/orders?success=true")
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.files.length > 0
      case 2:
        return formData.shopId !== "" && formData.printSides !== ""
      case 3:
        return formData.paymentMethod !== ""
      default:
        return true
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-200",
                currentStep >= step.id
                  ? "bg-primary border-primary text-primary-foreground"
                  : "border-muted-foreground text-muted-foreground",
              )}
            >
              <step.icon className="h-5 w-5" />
            </div>
            <span
              className={cn(
                "ml-2 text-sm font-medium",
                currentStep >= step.id ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {step.name}
            </span>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-16 h-0.5 mx-4 transition-colors duration-200",
                  currentStep > step.id ? "bg-primary" : "bg-muted",
                )}
              />
            )}
          </div>
        ))}
      </div>

      <Progress value={(currentStep / steps.length) * 100} className="w-full" />

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].name}</CardTitle>
          <CardDescription>
            {currentStep === 1 && "Upload the documents you want to print"}
            {currentStep === 2 && "Choose your printing preferences and shop"}
            {currentStep === 3 && "Select your payment method"}
            {currentStep === 4 && "Review and confirm your order"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: File Upload */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors duration-200">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">Drop files here or click to browse</p>
                  <p className="text-sm text-muted-foreground">
                    Supports PDF, DOC, DOCX, PPT, PPTX, JPG, PNG files up to 10MB each
                  </p>
                </div>
                <Input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="mt-4 cursor-pointer"
                />
              </div>

              {uploadError && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <p className="text-sm text-destructive">{uploadError}</p>
                </div>
              )}

              {formData.files.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-medium">Uploaded Files:</h4>
                  {formData.files.map((file, index) => (
                    <div key={index} className="space-y-3 p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{file.name}</span>
                          <span className="text-xs text-muted-foreground">
                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      {file.name.toLowerCase().endsWith(".pdf") && (
                        <div className="space-y-2">
                          <Label htmlFor={`pages-${index}`} className="text-sm">
                            Page Range
                          </Label>
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant={formData.pageRanges[file.name] === "all" ? "default" : "outline"}
                              size="sm"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  pageRanges: { ...prev.pageRanges, [file.name]: "all" },
                                }))
                              }
                            >
                              All Pages
                            </Button>
                            <Input
                              id={`pages-${index}`}
                              placeholder="e.g., 1-5, 8, 10-12"
                              className="flex-1 text-sm"
                              value={formData.pageRanges[file.name] === "all" ? "" : formData.pageRanges[file.name]}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  pageRanges: { ...prev.pageRanges, [file.name]: e.target.value },
                                }))
                              }
                              disabled={formData.pageRanges[file.name] === "all"}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Leave blank for all pages, or specify ranges like "1-5, 8, 10-12"
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 2: Print Options */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="shop">Select Shop</Label>
                <Select
                  value={formData.shopId}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, shopId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a print shop" />
                  </SelectTrigger>
                  <SelectContent>
                    {shops.map((shop) => (
                      <SelectItem key={shop.id} value={shop.id}>
                        <div>
                          <div className="font-medium">{shop.name}</div>
                          <div className="text-sm text-muted-foreground">{shop.location}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="copies">Number of Copies</Label>
                  <Input
                    id="copies"
                    type="number"
                    min="1"
                    max="100"
                    value={formData.copies}
                    onChange={(e) => setFormData((prev) => ({ ...prev, copies: Number.parseInt(e.target.value) || 1 }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paper-size">Paper Size</Label>
                  <Select
                    value={formData.paperSize}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, paperSize: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A4">A4</SelectItem>
                      <SelectItem value="A3">A3</SelectItem>
                      <SelectItem value="Letter">Letter</SelectItem>
                      <SelectItem value="Legal">Legal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Color Type</Label>
                <RadioGroup
                  value={formData.colorType}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, colorType: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="black-white" id="bw" />
                    <Label htmlFor="bw">Black & White ($0.10/page)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="color" id="color" />
                    <Label htmlFor="color">Color ($0.50/page)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Print Sides</Label>
                <RadioGroup
                  value={formData.printSides}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, printSides: value as "single" | "double" }))
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="single" id="single-sided" />
                    <Label htmlFor="single-sided">Single-sided</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="double" id="double-sided" />
                    <Label htmlFor="double-sided">Double-sided (20% discount)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Binding Options</Label>
                <RadioGroup
                  value={formData.binding}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, binding: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="no-binding" />
                    <Label htmlFor="no-binding">No Binding (Free)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="staple" id="staple" />
                    <Label htmlFor="staple">Staple (Free)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="comb" id="comb" />
                    <Label htmlFor="comb">Comb Binding (+$1.50)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="spiral" id="spiral" />
                    <Label htmlFor="spiral">Spiral Binding (+$2.00)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                <Textarea
                  id="instructions"
                  placeholder="Any special printing instructions..."
                  value={formData.specialInstructions}
                  onChange={(e) => setFormData((prev) => ({ ...prev, specialInstructions: e.target.value }))}
                />
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Order Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Files: {formData.files.length}</span>
                    <span>Copies: {formData.copies}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Paper: {formData.paperSize}</span>
                    <span>Type: {formData.colorType === "color" ? "Color" : "B&W"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Binding: {formData.binding === "none" ? "None" : formData.binding}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sides: {formData.printSides === "single" ? "Single-sided" : "Double-sided"}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                      <span>Total Amount:</span>
                      <span>${calculateTotal()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Payment Method</Label>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentMethod: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Credit/Debit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="campus-card" id="campus-card" />
                    <Label htmlFor="campus-card">Campus Card</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Ready to Submit Order</h3>
                <p className="text-muted-foreground">
                  Your order will be sent to {shops.find((s) => s.id === formData.shopId)?.name} for processing.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-left max-w-md mx-auto">
                <h4 className="font-medium mb-2">Final Order Details</h4>
                <div className="space-y-1 text-sm">
                  <div>Files: {formData.files.map((f) => f.name).join(", ")}</div>
                  <div>Shop: {shops.find((s) => s.id === formData.shopId)?.name}</div>
                  <div>Copies: {formData.copies}</div>
                  <div>Sides: {formData.printSides === "single" ? "Single-sided" : "Double-sided"}</div>
                  <div>Total: ${calculateTotal()}</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
          Back
        </Button>

        {currentStep < 4 ? (
          <Button onClick={handleNext} disabled={!canProceed()}>
            Next
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="hover:scale-105 transition-transform duration-200"
          >
            {isLoading ? "Submitting..." : "Submit Order"}
          </Button>
        )}
      </div>
    </div>
  )
}
