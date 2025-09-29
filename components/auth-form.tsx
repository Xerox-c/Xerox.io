"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, User, Building2, CheckCircle, AlertCircle, ArrowRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface AuthFormProps {
  defaultMode?: "login" | "signup"
}

interface FormErrors {
  email?: string
  password?: string
  confirmPassword?: string
  name?: string
  shopName?: string
}

export function AuthForm({ defaultMode = "login" }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userType, setUserType] = useState<"student" | "shopkeeper">("student")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [showSuccess, setShowSuccess] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    shopName: "",
  })

  const validateForm = (mode: "login" | "signup") => {
    const newErrors: FormErrors = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (mode === "signup" && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (mode === "signup") {
      // Name validation
      if (!formData.name) {
        newErrors.name = "Name is required"
      }

      // Confirm password validation
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password"
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }

      // Shop name validation for shopkeepers
      if (userType === "shopkeeper" && !formData.shopName) {
        newErrors.shopName = "Shop name is required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (mode: "login" | "signup") => {
    if (!validateForm(mode)) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)

    if (mode === "signup") {
      setShowSuccess(true)
      setTimeout(() => {
        window.location.href = userType === "student" ? "/student/dashboard" : "/shopkeeper/dashboard"
      }, 2000)
    } else {
      window.location.href = userType === "student" ? "/student/dashboard" : "/shopkeeper/dashboard"
    }

    console.log("Form submitted:", { mode, userType, formData })
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`)
  }

  if (showSuccess) {
    return (
      <div className="w-full max-w-md mx-auto animate-fade-in">
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-background via-background to-background/95 backdrop-blur-xl">
          <CardContent className="pt-12 pb-12">
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="h-3 w-3 text-yellow-800" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  Welcome to PrintQueue!
                </h2>
                <p className="text-muted-foreground text-lg">Your account has been created successfully</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-primary">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
              </div>
              <p className="text-sm text-muted-foreground">Redirecting you to your dashboard...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-background via-background to-background/95 backdrop-blur-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
        <CardHeader className="text-center pb-6 relative">
          <Link href="/" className="flex items-center justify-center space-x-3 mb-8 group">
            <div className="relative">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="h-6 w-6 bg-primary-foreground rounded-lg" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
              PrintQueue
            </span>
          </Link>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {defaultMode === "login" ? "Welcome Back!" : "Join PrintQueue"}
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              {defaultMode === "login"
                ? "Sign in to continue your printing journey"
                : "Create your account and start printing smarter"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 relative">
          <Tabs defaultValue={defaultMode} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted/30 backdrop-blur-sm border border-border/50">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-background data-[state=active]:shadow-md transition-all duration-200"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-background data-[state=active]:shadow-md transition-all duration-200"
              >
                Create Account
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-6 mt-8">
              <div className="space-y-4">
                <Label className="text-sm font-semibold text-foreground">Sign in as</Label>
                <RadioGroup
                  value={userType}
                  onValueChange={(value) => setUserType(value as "student" | "shopkeeper")}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="relative">
                    <RadioGroupItem value="student" id="login-student" className="peer sr-only" />
                    <Label
                      htmlFor="login-student"
                      className="flex items-center justify-center space-x-3 cursor-pointer rounded-xl border-2 border-muted bg-background/50 p-4 hover:bg-accent/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all duration-200 hover:scale-[1.02]"
                    >
                      <User className="h-5 w-5 text-primary" />
                      <span className="font-medium">Student</span>
                    </Label>
                  </div>
                  <div className="relative">
                    <RadioGroupItem value="shopkeeper" id="login-shopkeeper" className="peer sr-only" />
                    <Label
                      htmlFor="login-shopkeeper"
                      className="flex items-center justify-center space-x-3 cursor-pointer rounded-xl border-2 border-muted bg-background/50 p-4 hover:bg-accent/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all duration-200 hover:scale-[1.02]"
                    >
                      <Building2 className="h-5 w-5 text-primary" />
                      <span className="font-medium">Shopkeeper</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit("login")
                }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-sm font-semibold text-foreground">
                    Email Address
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-4 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      className={cn(
                        "pl-12 h-12 text-base bg-background/50 border-2 border-muted focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200",
                        errors.email && "border-destructive focus:border-destructive focus:ring-destructive/10",
                      )}
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center gap-2 text-sm text-destructive animate-fade-in">
                      <AlertCircle className="h-4 w-4" />
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-sm font-semibold text-foreground">
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-4 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className={cn(
                        "pl-12 pr-12 h-12 text-base bg-background/50 border-2 border-muted focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200",
                        errors.password && "border-destructive focus:border-destructive focus:ring-destructive/10",
                      )}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 h-8 w-8 hover:bg-primary/10 transition-colors duration-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                  {errors.password && (
                    <div className="flex items-center gap-2 text-sm text-destructive animate-fade-in">
                      <AlertCircle className="h-4 w-4" />
                      {errors.password}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Signing you in...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Sign In
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-6 mt-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit("signup")
                }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <Label className="text-sm font-semibold text-foreground">I am a</Label>
                  <RadioGroup
                    value={userType}
                    onValueChange={(value) => setUserType(value as "student" | "shopkeeper")}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="relative">
                      <RadioGroupItem value="student" id="student" className="peer sr-only" />
                      <Label
                        htmlFor="student"
                        className="flex items-center justify-center space-x-3 cursor-pointer rounded-xl border-2 border-muted bg-background/50 p-4 hover:bg-accent/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all duration-200 hover:scale-[1.02]"
                      >
                        <User className="h-5 w-5 text-primary" />
                        <span className="font-medium">Student</span>
                      </Label>
                    </div>
                    <div className="relative">
                      <RadioGroupItem value="shopkeeper" id="shopkeeper" className="peer sr-only" />
                      <Label
                        htmlFor="shopkeeper"
                        className="flex items-center justify-center space-x-3 cursor-pointer rounded-xl border-2 border-muted bg-background/50 p-4 hover:bg-accent/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all duration-200 hover:scale-[1.02]"
                      >
                        <Building2 className="h-5 w-5 text-primary" />
                        <span className="font-medium">Shopkeeper</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Enhanced form fields with same styling as login */}
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-sm font-semibold text-foreground">
                    {userType === "shopkeeper" ? "Owner Name" : "Full Name"}
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-4 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder={`Enter your ${userType === "shopkeeper" ? "full name" : "name"}`}
                      className={cn(
                        "pl-12 h-12 text-base bg-background/50 border-2 border-muted focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200",
                        errors.name && "border-destructive focus:border-destructive focus:ring-destructive/10",
                      )}
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                  {errors.name && (
                    <div className="flex items-center gap-2 text-sm text-destructive animate-fade-in">
                      <AlertCircle className="h-4 w-4" />
                      {errors.name}
                    </div>
                  )}
                </div>

                {userType === "shopkeeper" && (
                  <div className="space-y-2">
                    <Label htmlFor="shop-name" className="text-sm font-semibold text-foreground">
                      Shop Name
                    </Label>
                    <div className="relative group">
                      <Building2 className="absolute left-4 top-4 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                      <Input
                        id="shop-name"
                        type="text"
                        placeholder="Enter your shop name"
                        className={cn(
                          "pl-12 h-12 text-base bg-background/50 border-2 border-muted focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200",
                          errors.shopName && "border-destructive focus:border-destructive focus:ring-destructive/10",
                        )}
                        value={formData.shopName}
                        onChange={(e) => handleInputChange("shopName", e.target.value)}
                      />
                    </div>
                    {errors.shopName && (
                      <div className="flex items-center gap-2 text-sm text-destructive animate-fade-in">
                        <AlertCircle className="h-4 w-4" />
                        {errors.shopName}
                      </div>
                    )}
                  </div>
                )}

                {/* ... existing email and password fields with enhanced styling ... */}
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-sm font-semibold text-foreground">
                    Email Address
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-4 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      className={cn(
                        "pl-12 h-12 text-base bg-background/50 border-2 border-muted focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200",
                        errors.email && "border-destructive focus:border-destructive focus:ring-destructive/10",
                      )}
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center gap-2 text-sm text-destructive animate-fade-in">
                      <AlertCircle className="h-4 w-4" />
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-sm font-semibold text-foreground">
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-4 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className={cn(
                        "pl-12 pr-12 h-12 text-base bg-background/50 border-2 border-muted focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200",
                        errors.password && "border-destructive focus:border-destructive focus:ring-destructive/10",
                      )}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 h-8 w-8 hover:bg-primary/10 transition-colors duration-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                  {errors.password && (
                    <div className="flex items-center gap-2 text-sm text-destructive animate-fade-in">
                      <AlertCircle className="h-4 w-4" />
                      {errors.password}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-sm font-semibold text-foreground">
                    Confirm Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-4 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className={cn(
                        "pl-12 pr-12 h-12 text-base bg-background/50 border-2 border-muted focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200",
                        errors.confirmPassword &&
                          "border-destructive focus:border-destructive focus:ring-destructive/10",
                      )}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 h-8 w-8 hover:bg-primary/10 transition-colors duration-200"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <div className="flex items-center gap-2 text-sm text-destructive animate-fade-in">
                      <AlertCircle className="h-4 w-4" />
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Creating your account...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Create Account
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Enhanced social login section */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-4 text-muted-foreground font-medium">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("google")}
                className="h-12 hover:scale-[1.02] transition-all duration-200 border-2 border-muted hover:border-primary/50 hover:bg-primary/5"
              >
                <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("facebook")}
                className="h-12 hover:scale-[1.02] transition-all duration-200 border-2 border-muted hover:border-primary/50 hover:bg-primary/5"
              >
                <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
