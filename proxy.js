import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function proxy(request) {
  let response = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') return NextResponse.redirect(new URL('/admin/login', request.url));
    return response;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });
  const { data: { user } } = await supabase.auth.getUser();
  if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login' && !user) return NextResponse.redirect(new URL('/admin/login', request.url));
  return response;
}

// Keep API authentication inside the route handlers so unauthorized callers receive
// structured JSON instead of an HTML redirect. The middleware only guards admin pages.
export const config = { matcher: ['/admin/:path*'] };
