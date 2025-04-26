import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
  category: z.string(),
});

// Get FAQs
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const faqId = url.searchParams.get("id");
    const category = url.searchParams.get("category");

    // If ID is provided, return the specific FAQ
    if (faqId) {
      const faq = await prisma.fAQ.findUnique({
        where: { id: faqId },
      });

      if (!faq) {
        return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
      }

      return NextResponse.json(faq);
    }

    // For listing FAQs
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Build the query
    const query: any = {};

    // Filter by category if provided
    if (category) {
      query.category = category;
    }

    // Get FAQs with pagination
    const faqs = await prisma.fAQ.findMany({
      where: query,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    // Get total count for pagination
    const total = await prisma.fAQ.count({
      where: query,
    });

    return NextResponse.json({
      data: faqs,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Create a new FAQ (admin only)
export async function POST(req: Request) {
  try {
    const userRole = req.headers.get("userRole");

    // Only admin can create FAQs
    if (userRole !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const faqData = faqSchema.parse(body);

    const faq = await prisma.fAQ.create({
      data: faqData,
    });

    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update an FAQ (admin only)
export async function PUT(req: Request) {
  try {
    const userRole = req.headers.get("userRole");

    // Only admin can update FAQs
    if (userRole !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    const url = new URL(req.url);
    const faqId = url.searchParams.get("id");

    if (!faqId) {
      return NextResponse.json(
        { error: "FAQ ID is required" },
        { status: 400 }
      );
    }

    // Check if FAQ exists
    const existingFAQ = await prisma.fAQ.findUnique({
      where: { id: faqId },
    });

    if (!existingFAQ) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    const body = await req.json();
    const faqData = faqSchema.parse(body);

    const updatedFAQ = await prisma.fAQ.update({
      where: { id: faqId },
      data: faqData,
    });

    return NextResponse.json(updatedFAQ);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete an FAQ (admin only)
export async function DELETE(req: Request) {
  try {
    const userRole = req.headers.get("userRole");

    // Only admin can delete FAQs
    if (userRole !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    const url = new URL(req.url);
    const faqId = url.searchParams.get("id");

    if (!faqId) {
      return NextResponse.json(
        { error: "FAQ ID is required" },
        { status: 400 }
      );
    }

    // Check if FAQ exists
    const existingFAQ = await prisma.fAQ.findUnique({
      where: { id: faqId },
    });

    if (!existingFAQ) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    await prisma.fAQ.delete({
      where: { id: faqId },
    });

    return NextResponse.json({ message: "FAQ deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
