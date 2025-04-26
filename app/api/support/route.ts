import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const ticketSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]).optional(),
});

// Get user's support tickets
export async function GET(req: Request) {
  try {
    const userId = req.headers.get("userId");
    const userRole = req.headers.get("userRole");

    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    const url = new URL(req.url);
    const ticketId = url.searchParams.get("id");

    // If ticketId is provided, return the specific ticket
    if (ticketId) {
      const ticket = await prisma.supportTicket.findUnique({
        where: { id: ticketId },
      });

      if (!ticket) {
        return NextResponse.json(
          { error: "Ticket not found" },
          { status: 404 }
        );
      }

      // Regular users can only access their own tickets
      if (userRole !== "ADMIN" && ticket.userId !== userId) {
        return NextResponse.json(
          { error: "Unauthorized to access this ticket" },
          { status: 403 }
        );
      }

      return NextResponse.json(ticket);
    }

    // For listing tickets
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Build the query based on role
    const query: any = {};

    // Regular users can only see their own tickets
    if (userRole !== "ADMIN") {
      query.userId = userId;
    }

    // Get tickets with pagination
    const tickets = await prisma.supportTicket.findMany({
      where: query,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    // Get total count for pagination
    const total = await prisma.supportTicket.count({
      where: query,
    });

    return NextResponse.json({
      data: tickets,
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

// Create a new support ticket
export async function POST(req: Request) {
  try {
    const userId = req.headers.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    const body = await req.json();
    const ticketData = ticketSchema.parse(body);

    const ticket = await prisma.supportTicket.create({
      data: {
        ...ticketData,
        userId,
      },
    });

    return NextResponse.json(ticket, { status: 201 });
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

// Update a support ticket
export async function PUT(req: Request) {
  try {
    const userId = req.headers.get("userId");
    const userRole = req.headers.get("userRole");

    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    const url = new URL(req.url);
    const ticketId = url.searchParams.get("id");

    if (!ticketId) {
      return NextResponse.json(
        { error: "Ticket ID is required" },
        { status: 400 }
      );
    }

    // Check if ticket exists
    const existingTicket = await prisma.supportTicket.findUnique({
      where: { id: ticketId },
    });

    if (!existingTicket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    // Regular users can only update their own tickets
    if (userRole !== "ADMIN" && existingTicket.userId !== userId) {
      return NextResponse.json(
        { error: "Unauthorized to update this ticket" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const ticketData = ticketSchema.parse(body);

    const updatedTicket = await prisma.supportTicket.update({
      where: { id: ticketId },
      data: ticketData,
    });

    return NextResponse.json(updatedTicket);
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

// Delete a support ticket
export async function DELETE(req: Request) {
  try {
    const userId = req.headers.get("userId");
    const userRole = req.headers.get("userRole");

    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    const url = new URL(req.url);
    const ticketId = url.searchParams.get("id");

    if (!ticketId) {
      return NextResponse.json(
        { error: "Ticket ID is required" },
        { status: 400 }
      );
    }

    // Check if ticket exists
    const existingTicket = await prisma.supportTicket.findUnique({
      where: { id: ticketId },
    });

    if (!existingTicket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    // Regular users can only delete their own tickets
    if (userRole !== "ADMIN" && existingTicket.userId !== userId) {
      return NextResponse.json(
        { error: "Unauthorized to delete this ticket" },
        { status: 403 }
      );
    }

    await prisma.supportTicket.delete({
      where: { id: ticketId },
    });

    return NextResponse.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
