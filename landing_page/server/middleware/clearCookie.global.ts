export default defineEventHandler((event) => {
  if (event.req.url?.includes('/reset-language')) {
    deleteCookie(event, 'googtrans');
    return sendRedirect(event, '/');
  }
});