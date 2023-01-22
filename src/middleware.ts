import { NextResponse } from 'next/server';

export function middleware(req: any, event: any) {
  const token = req.headers['Authorization'];

  if (token) {
    console.log('access granted');
  } else {
    console.log('not verfied');
    const url = req.nextUrl.clone();
    if (url.pathname !== '/login/') {
      url.pathname = '/login';
      url.search = '';
      return NextResponse.redirect(url);
    }
  }
}

export const config = {
  matcher: ['/', '/settings'],
};
