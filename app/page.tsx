import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <div className="size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              L
            </div>
            <span>LandCo</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:text-primary"
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-primary"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium hover:text-primary"
            >
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="hidden md:flex">
                Sign up
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    The platform for growing your business
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our platform helps you streamline operations, increase
                    revenue, and deliver exceptional customer experiences.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="h-12">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="h-12">
                    Learn More
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                  <span className="mx-2">•</span>
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>14-day free trial</span>
                  <span className="mx-2">•</span>
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Cancel anytime</span>
                </div>
              </div>
              <div className="mx-auto aspect-video overflow-hidden rounded-xl border bg-muted/50 object-cover shadow-xl lg:order-last">
                <img
                  src="/home.jpg"
                  alt="Dashboard Preview"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="bg-muted/50 py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Features
              </h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform offers everything you need to grow your business
                and delight your customers.
              </p>
            </div>
            <div className="mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12 mt-16">
              {[
                {
                  title: "Intuitive Dashboard",
                  description:
                    "Get a complete overview of your business with our easy-to-use dashboard.",
                  icon: "📊",
                },
                {
                  title: "Customer Management",
                  description:
                    "Manage your customers and their data all in one place.",
                  icon: "👥",
                },
                {
                  title: "Analytics & Reporting",
                  description:
                    "Make data-driven decisions with our powerful analytics tools.",
                  icon: "📈",
                },
                {
                  title: "Automation Tools",
                  description:
                    "Save time and reduce errors with our automation capabilities.",
                  icon: "⚙️",
                },
                {
                  title: "Mobile Friendly",
                  description:
                    "Access your business data from anywhere, on any device.",
                  icon: "📱",
                },
                {
                  title: "24/7 Support",
                  description:
                    "Our team is always available to help you with any questions.",
                  icon: "🛟",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-4xl">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="testimonials" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Trusted by thousands of businesses
              </h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Don't just take our word for it. Here's what our customers have
                to say.
              </p>
            </div>
            <div className="mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12 mt-16">
              {[
                {
                  quote:
                    "This platform has completely transformed how we operate. We've seen a 40% increase in efficiency.",
                  author: "Sarah Johnson",
                  role: "CEO, TechStart Inc.",
                },
                {
                  quote:
                    "The customer management tools are intuitive and powerful. It's made our team's workflow so much smoother.",
                  author: "Michael Chen",
                  role: "Operations Manager, GrowFast",
                },
                {
                  quote:
                    "The analytics provided insights we never had before. It's helped us make better business decisions.",
                  author: "Emma Rodriguez",
                  role: "Marketing Director, Elevate Co.",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 rounded-xl border bg-background p-6 shadow-sm"
                >
                  <div className="flex gap-4 items-center">
                    <div className="flex-1">
                      <p className="italic text-muted-foreground">
                        "{testimonial.quote}"
                      </p>
                      <div className="mt-4">
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="pricing" className="bg-muted/50 py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple, transparent pricing
              </h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the plan that's right for your business.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3 lg:gap-12 mt-16">
              {[
                {
                  title: "Starter",
                  price: "$29",
                  description:
                    "Perfect for small businesses just getting started.",
                  features: [
                    "Up to 5 team members",
                    "Basic analytics",
                    "Customer management",
                    "Email support",
                  ],
                  cta: "Get Started",
                  popular: false,
                },
                {
                  title: "Professional",
                  price: "$79",
                  description: "Ideal for growing businesses with more needs.",
                  features: [
                    "Up to 20 team members",
                    "Advanced analytics",
                    "Customer management",
                    "Automation tools",
                    "Priority support",
                  ],
                  cta: "Get Started",
                  popular: true,
                },
                {
                  title: "Enterprise",
                  price: "$149",
                  description:
                    "For large organizations with complex requirements.",
                  features: [
                    "Unlimited team members",
                    "Custom analytics",
                    "Advanced customer management",
                    "Custom automation",
                    "24/7 dedicated support",
                    "Custom integrations",
                  ],
                  cta: "Contact Sales",
                  popular: false,
                },
              ].map((plan, index) => (
                <div
                  key={index}
                  className={`flex flex-col rounded-xl border ${
                    plan.popular
                      ? "border-primary shadow-lg"
                      : "border-border shadow-sm"
                  } bg-background p-6`}
                >
                  <div className="flex flex-col gap-4">
                    <div className="space-y-2">
                      {plan.popular && (
                        <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          Most Popular
                        </div>
                      )}
                      <h3 className="text-2xl font-bold">{plan.title}</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <p className="text-muted-foreground">
                        {plan.description}
                      </p>
                    </div>
                    <ul className="flex flex-col gap-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`mt-auto ${
                        plan.popular
                          ? ""
                          : "bg-muted-foreground/80 hover:bg-muted-foreground"
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="faq" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Frequently asked questions
              </h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find answers to common questions about our platform.
              </p>
            </div>
            <div className="mx-auto grid max-w-3xl gap-8 mt-16">
              {[
                {
                  question: "How does the 14-day trial work?",
                  answer:
                    "You can use all features of our platform for 14 days without any commitment. No credit card required. At the end of the trial, you can choose a plan that fits your needs.",
                },
                {
                  question: "Can I change my plan later?",
                  answer:
                    "Yes, you can upgrade or downgrade your plan at any time. Changes to your subscription will be prorated.",
                },
                {
                  question: "Is there a setup fee?",
                  answer:
                    "No, there are no setup fees or hidden costs. You only pay the monthly subscription fee.",
                },
                {
                  question: "Do you offer discounts for annual billing?",
                  answer:
                    "Yes, you can save 20% by choosing annual billing instead of monthly billing.",
                },
                {
                  question: "How does your support work?",
                  answer:
                    "We offer email support for all plans. Professional plans include priority support, and Enterprise plans include 24/7 dedicated support.",
                },
              ].map((faq, index) => (
                <div key={index} className="rounded-lg border p-6">
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to get started?
              </h2>
              <p className="max-w-[85%] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of businesses already using our platform to grow.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" variant="secondary" className="h-12">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  Schedule a Demo
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold">
                <div className="size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  L
                </div>
                <span>LandCo</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Making business growth simple and accessible for everyone.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span className="sr-only">Instagram</span>
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} LandCo. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
