import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export function middleware(request: NextRequest) {
  // Exclude authentication routes from middleware
  if (
    request.nextUrl.pathname.startsWith("/api/auth") ||
    request.nextUrl.pathname === "/api/hello"
  ) {
    return NextResponse.next();
  }

  try {
    // Get token from header
    const token = request.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      // Create a Response object for unauthorized access
      return new NextResponse(
        JSON.stringify({ error: "Authentication token is required" }),
        {
          status: 401,
          headers: { "content-type": "application/json" },
        }
      );
    }

    // Verify token
    const decoded = verify(token, process.env.JWT_SECRET || "your-secret-key");
    const { userId, email, role } = decoded as {
      userId: string;
      email: string;
      role: string;
    };

    // Add user info to request headers for route handlers to use
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("userId", userId);
    requestHeaders.set("userEmail", email);
    requestHeaders.set("userRole", role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    // Create a Response object for invalid token
    return new NextResponse(
      JSON.stringify({ error: "Invalid authentication token" }),
      {
        status: 401,
        headers: { "content-type": "application/json" },
      }
    );
  }
}

// Configure which routes to apply the middleware to
export const config = {
  matcher: "/api/:path*",
};
