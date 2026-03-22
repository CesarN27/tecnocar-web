import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Verificamos si la persona intenta entrar a cualquier ruta dentro de /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    // Buscamos si tiene el "pase VIP" (la cookie)
    const isAuth = request.cookies.get('admin_token');

    // Si NO tiene la cookie, lo redirigimos a la página de login
    if (!isAuth) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // Si todo está bien, lo dejamos pasar
  return NextResponse.next();
}

// Le decimos al middleware en qué rutas debe activarse
export const config = {
  matcher: '/admin/:path*',
};