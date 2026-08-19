/* eslint-env node */
export const ADMIN_EMAILS = ['naufalm220@gmail.com', 'padukuhankedung@gmail.com']

export function isAdminEmail(email) {
  return ADMIN_EMAILS.includes(email)
}