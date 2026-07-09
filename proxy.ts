import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  // Vercel automatically sets x-vercel-ip-country on all requests.
  // Fall back to 'DEFAULT' (UK variant) if not present (local dev, unknown country).
  const country = request.headers.get('x-vercel-ip-country') ?? 'DEFAULT'

  // Forward on the *request* headers so server components can read it via
  // `headers()`. Setting it only on the response is invisible server-side.
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-user-country', country)

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set('x-user-country', country)
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimisation)
     * - favicon.ico, sitemap.xml, robots.txt
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
