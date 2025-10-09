import { NextResponse } from "next/server";
import { features } from "@/data/features";

export async function GET() {
  return NextResponse.json(features);
}
