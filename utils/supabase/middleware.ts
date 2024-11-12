import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            setCookie(request, name, value, options);
          },
          remove(name: string, options: CookieOptions) {
            setCookie(request, name, "", options);
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const userType = user?.user_metadata.user_type;
    const url = request.nextUrl.clone();

    const redirectResponse = redirectAuthorization(
      user,
      userType,
      request,
      url
    );
    if (redirectResponse) return redirectResponse;

    return response;
  } catch (e) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};

function setCookie(
  request: NextRequest,
  name: string,
  value: string,
  options: CookieOptions
) {
  request.cookies.set({ name, value, ...options });
}

const AUTH_PATHS = {
  GUEST_ONLY: ["/login", "/join"],
  USER_ONLY: ["/mypage", "/sellercenter"],
  SELLER_RESTRICTED: "/mypage",
  BUYER_RESTRICTED: "/sellercenter",
};

// 접근 권한 체크
function redirectAuthorization(
  user: any,
  userType: "BUYER" | "SELLER" | undefined,
  request: NextRequest,
  url: URL
) {
  const { nextUrl } = request;
  if (
    !user &&
    AUTH_PATHS.USER_ONLY.some((page) => nextUrl.pathname.startsWith(page))
  ) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  if (
    user &&
    AUTH_PATHS.GUEST_ONLY.some((page) => nextUrl.pathname.startsWith(page))
  ) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  if (
    userType === "BUYER" &&
    nextUrl.pathname.startsWith(AUTH_PATHS.BUYER_RESTRICTED)
  ) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  if (
    userType === "SELLER" &&
    nextUrl.pathname.startsWith(AUTH_PATHS.SELLER_RESTRICTED)
  ) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  return null;
}
