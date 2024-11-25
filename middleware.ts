import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    try {
        const token = request.cookies.get("auth_cookie");

        // Si no hay token, redirigir y eliminar el usuario en el cliente
        if (!token) {
            return NextResponse.redirect(
                new URL("/?clearUser=true", request.url)
            );
        }

        const res = await fetch(
            "https://trenza-admin.vercel.app/api/auth/check",
            {
                headers: {
                    token: token.value,
                },
            }
        );

        const data = await res.json();

        // @ts-ignore
        if (!data.isAuthorized) {
            return NextResponse.redirect(
                new URL("/?clearUser=true", request.url)
            );
        }

        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL("/?clearUser=true", request.url));
    }
}

export const config = {
    matcher: "/admin/:path*",
};
