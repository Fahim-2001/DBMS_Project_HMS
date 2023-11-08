import pool from "@/app/utils/db";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();

export async function GET(req, content) {
  try {
    // Data retrieving from db using user's email and appointment id.
      const [data] = await connection.query(
        "SELECT*FROM appointments WHERE ref_email=? AND appt_id=?",
        [content.params.slug[0], content.params.slug[1]]
      );
      connection.release();
      return NextResponse.json(data[0], { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}