import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const customerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
});

export async function GET(req: Request) {
  try {
    const userId = req.headers.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    const customers = await prisma.customer.findMany({
      where: { userId },
    });

    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const userId = req.headers.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    const body = await req.json();
    const customerData = customerSchema.parse(body);

    const customer = await prisma.customer.create({
      data: {
        ...customerData,
        userId,
      },
    });

    return NextResponse.json(customer, { status: 201 });
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

export async function PUT(req: Request) {
  try {
    const userId = req.headers.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Customer ID is required" },
        { status: 400 }
      );
    }

    // Check if customer exists and belongs to user
    const existingCustomer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!existingCustomer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    if (existingCustomer.userId !== userId) {
      return NextResponse.json(
        { error: "Unauthorized to update this customer" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const customerData = customerSchema.parse(body);

    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data: customerData,
    });

    return NextResponse.json(updatedCustomer);
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

export async function DELETE(req: Request) {
  try {
    const userId = req.headers.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Customer ID is required" },
        { status: 400 }
      );
    }

    // Check if customer exists and belongs to user
    const existingCustomer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!existingCustomer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    if (existingCustomer.userId !== userId) {
      return NextResponse.json(
        { error: "Unauthorized to delete this customer" },
        { status: 403 }
      );
    }

    await prisma.customer.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Customer deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
