import pool from "@/app/(backend)/utils/db";
import { sqlQueries } from "@/app/(backend)/utils/sqlQueries";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();

export async function GET(req, content) {
  try {
    // Appointment by user's email and appointment id.
      const [data] = await connection.query(
        sqlQueries.appointments.getByEmailAndId,
        [content.params.slug[0], content.params.slug[1]]
      );
      connection.release();
      return NextResponse.json(data[0], { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}