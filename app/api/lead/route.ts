import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY;

    if (!url || !key) {
      console.error("Missing Supabase env vars");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    const res = await fetch(`${url}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify({
        name: body.name ?? null,
        email: body.email ?? null,
        phone: body.phone ?? null,
        city: body.city ?? null,
        service_needed: body.serviceNeeded ?? null,
        source: body.source ?? "hydra"
      })
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Supabase error:", text);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
