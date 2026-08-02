import { cookies } from "next/headers";

export const SESSION_COOKIE = "pakeinaja_admin";

export function isAuthed() {
  const cookieStore = cookies();
  const value = cookieStore.get(SESSION_COOKIE)?.value;
  return Boolean(value) && value === process.env.ADMIN_PASSWORD;
}

export function checkPassword(password) {
  return (
    typeof password === "string" &&
    password.length > 0 &&
    password === process.env.ADMIN_PASSWORD
  );
}
