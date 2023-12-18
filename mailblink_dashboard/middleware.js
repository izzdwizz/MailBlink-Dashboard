import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next()

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession()

  // route protection logic 
   // Get the user object from the session
   const { user } = await supabase.auth.getUser(req);

  //  get target url
  const origin = req.nextUrl.origin;

   if (!user && origin.includes("/auth/dashboard")) {
    // Redirect to login page
    return NextResponse.redirect(`${origin} + /auth/login`);
  }

   if (user && origin.includes("/auth/login")) {
    // Redirect to dashboard page
    return NextResponse.redirect(`${origin} + /auth/dashboard`);
  }

   if (user && origin.includes("/auth/signup")) {
    // Redirect to dashboard page
    return NextResponse.redirect(`${origin} + /auth/dashboard`);
  }

  return res
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
   
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}