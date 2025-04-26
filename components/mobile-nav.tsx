"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full sm:max-w-sm">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-4 py-2">
            <div className="flex items-center gap-2 font-bold">
              <div className="size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                L
              </div>
              <span>LandCo</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <nav className="flex-1 overflow-auto py-4">
            <div className="flex flex-col space-y-4 px-4">
              <div className="flex items-center justify-between pb-4">
                <span className="text-sm font-medium">Toggle theme</span>
                <ThemeToggle />
              </div>
              <Link
                href="#features"
                className="text-lg font-medium hover:text-primary"
                onClick={() => setOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#testimonials"
                className="text-lg font-medium hover:text-primary"
                onClick={() => setOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="#pricing"
                className="text-lg font-medium hover:text-primary"
                onClick={() => setOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#faq"
                className="text-lg font-medium hover:text-primary"
                onClick={() => setOpen(false)}
              >
                FAQ
              </Link>
            </div>
            <div className="mt-8 border-t px-4 pt-8">
              <div className="flex flex-col space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setOpen(false)}
                >
                  Log in
                </Button>
                <Button
                  className="w-full justify-start"
                  onClick={() => setOpen(false)}
                >
                  Sign up
                </Button>
              </div>
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
