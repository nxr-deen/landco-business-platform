"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setServerError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        setServerError(result.error || "Login failed");
      } else {
        // Store JWT in localStorage (or cookie for production)
        localStorage.setItem("token", result.token);
        router.push("/");
      }
    } catch (err) {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <Link href="/">
              <div className="size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                L
              </div>
            </Link>
            <Link href="/">
              <span>LandCo</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/#features"
              className="text-sm font-medium hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="/#testimonials"
              className="text-sm font-medium hover:text-primary"
            >
              Testimonials
            </Link>
            <Link
              href="/#pricing"
              className="text-sm font-medium hover:text-primary"
            >
              Pricing
            </Link>
            <Link
              href="/#faq"
              className="text-sm font-medium hover:text-primary"
            >
              FAQ
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center bg-muted/50 py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto bg-background p-8 rounded-xl border shadow-md w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold tracking-tighter">Login</h2>
              <p className="text-muted-foreground">
                Enter your credentials to sign in to your account
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  autoComplete="email"
                  placeholder="name@example.com"
                />
                {errors.email && (
                  <p className="text-destructive text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  autoComplete="current-password"
                />
                {errors.password && (
                  <p className="text-destructive text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {serverError && (
                <p className="text-destructive text-center">{serverError}</p>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-primary font-medium underline-offset-4 hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container px-4 md:px-6">
          <div className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} LandCo. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
