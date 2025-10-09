import { NextResponse } from "next/server";
import { plans } from "@/data/plans";

export async function GET() {
  return NextResponse.json(plans);
}
