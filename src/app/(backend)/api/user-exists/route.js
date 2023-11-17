import pool from "@/app/(backend)/utils/db";
import { NextResponse } from "next/server";
import { sqlQueries } from "../../utils/sqlQueries";

const connection = await pool.getConnection();
export async function POST(req) {
  try {
    const email = await req.json();

    const userData = await connection.query(sqlQueries.users.getByEmail, [
      email,
    ]);
    connection.release();

    return NextResponse.json(userData[0][0] || {}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
