import { NextResponse } from "next/server";
import { faqItems } from "@/data/faq-items";

export async function GET() {
  return NextResponse.json(faqItems);
}
