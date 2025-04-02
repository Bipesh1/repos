// import { NextResponse } from 'next/server'; 
// import type { NextRequest } from 'next/server'; 

// const AUTH_RESTRICTED_ROUTES = ['/login', '/register','/superadmin','/admin']; 

// export async function middleware(request: NextRequest) { 
//   const { pathname } = request.nextUrl; 
//   const token = request.cookies.get('refreshToken')?.value; 

//   // No token - send to login page for all protected routes
//   if (!token) {
//     if (pathname.startsWith('/dashboard') || 
//         pathname.startsWith('/admindashboard') || 
//         pathname.startsWith('/studentdashboard')) {
//       return NextResponse.redirect(new URL('/login', request.url));
//     }
//     return NextResponse.next();
//   }

//   // Token exists - check user details
//   try { 
//     // Add a timeout to prevent indefinite waiting
//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

//     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/checkuser`, { 
//       headers: { 'Authorization': `Bearer ${token}` },
//       signal: controller.signal, // Add abort signal
//     }); 

//     clearTimeout(timeoutId);

//     if (response.ok) {
//       const { role, category } = await response.json();

//       // Handling login/register routes when authenticated
//       if (AUTH_RESTRICTED_ROUTES.includes(pathname)) {
//         return NextResponse.redirect(new URL('/', request.url));
//       }

//       // Dashboard route checks
//       if (pathname.startsWith('/dashboard') || 
//           pathname.startsWith('/admindashboard') || 
//           pathname.startsWith('/studentdashboard')) {
        
//         // Special handling for users
//         if (role === 'user') {
//           // No tier - prevent access to any dashboard
//           if (category=="none") {
//             return NextResponse.redirect(new URL('/', request.url));
//           }

//           // Users can only access student dashboard
//           if (!pathname.startsWith('/studentdashboard')) {
//             return NextResponse.redirect(new URL('/studentdashboard', request.url));
//           }
//         }

//         // Role-based route validation for other roles
//         if ( 
//           (role === 'super-admin' && !pathname.startsWith('/dashboard')) || 
//           (role === 'admin' && !pathname.startsWith('/admindashboard')) 
//         ) { 
//           const redirectPath = role === 'super-admin' ? '/dashboard' : '/admindashboard';
//           return NextResponse.redirect(new URL(redirectPath, request.url)); 
//         } 
//       }
//     } else {
//       // Invalid token
//       return NextResponse.redirect(new URL('/login', request.url));
//     }
//   } catch (error) { 
//     // Log the error without crashing
//     console.error("User check failed:", error); 

//     // If backend is unreachable, allow access to non-dashboard routes
//     if (pathname.startsWith('/dashboard') || 
//         pathname.startsWith('/admindashboard') || 
//         pathname.startsWith('/studentdashboard')) {
//       return NextResponse.redirect(new URL('/login', request.url));
//     }

//     // For other routes, continue normally
//     return NextResponse.next(); 
//   } 

//   return NextResponse.next(); 
// } 

// export const config = { 
//   matcher: '/((?!_next/static|_next/image|favicon.ico|api).*)', 
// };