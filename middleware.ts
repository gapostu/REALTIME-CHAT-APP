// import { authMiddleware } from '@clerk/nextjs';

// export default authMiddleware({
//   publicRoutes: ['/api/uploadthing'],
// });

// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// };
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/(.*)']);
const isPublicRoute = createRouteMatcher(['/api/uploadthing']);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return;
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
