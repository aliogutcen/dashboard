import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Interfaces
interface UserData {
  role: UserRole;
  id: string;
  email: string;
}

// Enums
enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

enum Routes {
  AUTH = '/auth',
  LOGIN = '/auth/login',
  DASHBOARD = '/dashboard'
}

// Constants
const COOKIE_TOKEN_NAME = 'token';

// Helper Functions
const createUrl = (path: string, baseUrl: string): URL => {
  return new URL(path, baseUrl);
};

const redirectToLogin = (request: NextRequest): NextResponse => {
  const response = NextResponse.redirect(createUrl(Routes.LOGIN, request.url));
  response.cookies.delete(COOKIE_TOKEN_NAME);
  return response;
};

const validateToken = async (token: string): Promise<UserData | null> => {
  try {
    const validateUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/validate`;
    const response = await fetch(validateUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Token doğrulama hatası:', error);
    return null;
  }
};

const isAuthPath = (path: string): boolean => {
  return path.startsWith(Routes.AUTH);
};

// Middleware
export async function middleware(request: NextRequest) {
  // try {
  //   const path = request.nextUrl.pathname;
  //   const token = request.cookies.get(COOKIE_TOKEN_NAME)?.value;

  //   // Redirect to dashboard if authenticated user tries to access auth pages
  //   if (isAuthPath(path) && token) {
  //     return NextResponse.redirect(createUrl(Routes.DASHBOARD, request.url));
  //   }

  //   // Require authentication for non-auth pages
  //   if (!isAuthPath(path) && !token) {
  //     return redirectToLogin(request);
  //   }

  //   // Validate token and check admin permissions for protected routes
  //   if (!isAuthPath(path)) {
  //     const userData = await validateToken(token!);
      
  //     if (!userData || userData.role !== UserRole.ADMIN) {
  //       return redirectToLogin(request);
  //     }
  //   }

  //   return NextResponse.next();
  // } catch (error) {
  //   console.error('Token doğrulama hatası:', error);
  //   return redirectToLogin(request);
  // }
}

// Route configuration
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)'
  ]
};
