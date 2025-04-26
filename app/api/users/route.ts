import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { hash } from "bcryptjs";

const userUpdateSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.enum(["USER", "ADMIN"]).optional(),
});

// Get user profile or users list (admin)
export async function GET(req: Request) {
  try {
    const userId = req.headers.get("userId");
    const userRole = req.headers.get("userRole");

    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    const url = new URL(req.url);
    const targetId = url.searchParams.get("id");

    // If an ID is provided, return that specific user (must be admin or self)
    if (targetId) {
      // Users can only access their own data unless they're admin
      if (userRole !== "ADMIN" && targetId !== userId) {
        return NextResponse.json(
          { error: "Unauthorized access" },
          { status: 403 }
        );
      }

      const user = await prisma.user.findUnique({
        where: { id: targetId },
        include: {
          subscription: true,
        },
      });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      return NextResponse.json(userWithoutPassword);
    }

    // Listing users is admin-only
    if (userRole !== "ADMIN") {
      // Non-admin users should get their own profile
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          subscription: true,
        },
      });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      return NextResponse.json(userWithoutPassword);
    }

    // For admin listing all users
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const users = await prisma.user.findMany({
      skip,
      take: limit,
      include: {
        subscription: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Get total count for pagination
    const total = await prisma.user.count();

    // Remove passwords from response
    const usersWithoutPasswords = users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return NextResponse.json({
      data: usersWithoutPasswords,
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

// Update user profile
export async function PUT(req: Request) {
  try {
    const userId = req.headers.get("userId");
    const userRole = req.headers.get("userRole");

    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    const url = new URL(req.url);
    const targetId = url.searchParams.get("id") || userId;

    // Users can only update their own profile unless they're admin
    if (userRole !== "ADMIN" && targetId !== userId) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: targetId },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const userData = userUpdateSchema.parse(body);

    // Only admin can update roles
    if (userData.role && userRole !== "ADMIN") {
      delete userData.role;
    }

    // Hash password if provided
    if (userData.password) {
      userData.password = await hash(userData.password, 12);
    }

    // If email is being changed, check if it's already in use
    if (userData.email && userData.email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (emailExists) {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 400 }
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: targetId },
      data: userData,
      include: {
        subscription: true,
      },
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;

    return NextResponse.json(userWithoutPassword);
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

// Delete user (admin only or self)
export async function DELETE(req: Request) {
  try {
    const userId = req.headers.get("userId");
    const userRole = req.headers.get("userRole");

    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    const url = new URL(req.url);
    const targetId = url.searchParams.get("id");

    if (!targetId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Users can only delete their own account unless they're admin
    if (userRole !== "ADMIN" && targetId !== userId) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: targetId },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete the user (cascading delete will remove related data)
    await prisma.user.delete({
      where: { id: targetId },
    });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
