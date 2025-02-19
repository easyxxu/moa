export const DEFAULT_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_SITE_URL || `https://${process.env.VERCEL_URL}`
    : "http://192.168.0.22:3000";
