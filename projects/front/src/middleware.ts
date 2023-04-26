import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    console.log("middleware");
    //return NextResponse.redirect(url);
    return NextResponse.next();
  }
export const config = {   matcher: ["/", "/((?!_next/static|favicon.ico|logo.svg).*)"], };