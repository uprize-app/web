import type { NextRequest } from "next/server";

import { updateSession } from "@/shared/lib/supabase/middleware";

export const proxy = (request: NextRequest) => updateSession(request);

export const config = {
  matcher: [
    /*
     * 다음을 제외한 모든 경로:
     * - _next/static, _next/image, favicon.ico, 정적 자산
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
