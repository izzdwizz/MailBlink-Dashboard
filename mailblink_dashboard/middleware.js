import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next()

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession()

  // route protection logic 
   // check if user exist from cookie logs
   const isAuth = req.cookies.has('sb-bynubqxabbrzfctydfwm-auth-token')

  //  get target url
  const origin = req.url;

  // new url for redirection
  const url = new URL(req.url)

   if (!isAuth && origin.includes("/auth/dashboard")) {
    // Redirect to login page
    return NextResponse.redirect(url.origin + '/auth/login');
  }

  if (isAuth && (origin.includes("/auth/login") || origin.includes("/auth/signup"))) {
    // Redirect to dashboard page
    return NextResponse.redirect(url.origin + "/auth/dashboard");
  }

  return res
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
   
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}