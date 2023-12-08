import pool from "@/app/(backend)/utils/db";
// import { sqlQueries } from "@/app/(backend)/utils/sqlQueries";
import { NextResponse } from "next/server";



export async function GET(req) {
  try {
    const connection = await pool.getConnection();
    const url = new URL(req.url);
    const unique_id = url.searchParams.get("uniqueId");

    const [data] = await connection.query(
      "SELECT * FROM appointments WHERE unique_id=?",
      [unique_id]
    );
    connection.release();

    return NextResponse.json(data[0] || {}, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
