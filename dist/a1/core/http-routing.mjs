export function routeForPathname(pathname='/') {
  if (pathname === '/') return { type:'redirect', location:'/web/' };
  if (pathname === '/web/') return { type:'file', path:'/web/index.html' };
  return { type:'file', path:pathname };
}
