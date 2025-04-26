import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const subscriptionSchema = z.object({
  plan: z.enum(["FREE", "STARTER", "PROFESSIONAL", "ENTERPRISE"]),
  status: z.enum(["ACTIVE", "INACTIVE", "CANCELLED", "TRIAL"]).optional(),
  endDate: z.string().optional(),
});

// Get user's subscription
export async function GET(req: Request) {
  try {
    const userId = req.headers.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(subscription);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update subscription
export async function PUT(req: Request) {
  try {
    const userId = req.headers.get("userId");
    const userRole = req.headers.get("userRole");

    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    // Only user can update their own subscription or admin can update anyone's
    if (userRole !== "ADMIN") {
      const url = new URL(req.url);
      const targetUserId = url.searchParams.get("userId");

      if (targetUserId && targetUserId !== userId) {
        return NextResponse.json(
          { error: "Unauthorized to update this subscription" },
          { status: 403 }
        );
      }
    }

    const targetId = req.headers.get("userId");
    const body = await req.json();
    const subscriptionData = subscriptionSchema.parse(body);

    // Format the end date if provided
    let formattedData: any = { ...subscriptionData };
    if (subscriptionData.endDate) {
      formattedData.endDate = new Date(subscriptionData.endDate);
    }

    // Check if subscription exists
    const existingSubscription = await prisma.subscription.findUnique({
      where: { userId: targetId },
    });

    if (!existingSubscription) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 }
      );
    }

    // Update the subscription
    const updatedSubscription = await prisma.subscription.update({
      where: { userId: targetId },
      data: formattedData,
    });

    return NextResponse.json(updatedSubscription);
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

// Admin-only: Get all subscriptions
export async function POST(req: Request) {
  try {
    const userRole = req.headers.get("userRole");

    // Only admin can access all subscriptions
    if (userRole !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { page = 1, limit = 10 } = body;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get subscriptions with pagination
    const subscriptions = await prisma.subscription.findMany({
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    // Get total count for pagination
    const total = await prisma.subscription.count();

    return NextResponse.json({
      data: subscriptions,
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
