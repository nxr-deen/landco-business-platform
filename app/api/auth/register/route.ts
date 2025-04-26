import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = userSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    try {
      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      // Create free subscription
      await prisma.subscription.create({
        data: {
          userId: user.id,
          plan: "FREE",
          status: "ACTIVE",
        },
      });

      return NextResponse.json(
        { message: "User created successfully" },
        { status: 201 }
      );
    } catch (dbError) {
      console.error("Database error during registration:", dbError);
      return NextResponse.json(
        { error: "Failed to create user account. Please try again." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Registration error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
