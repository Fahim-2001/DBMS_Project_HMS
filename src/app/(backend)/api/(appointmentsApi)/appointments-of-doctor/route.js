import pool from "@/app/(backend)/utils/db";
import { NextResponse } from "next/server";
import { sqlQueries } from "../../../utils/sqlQueries";



// Doctor By ID api
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const doctorEmail = url.searchParams.get("doctoremail");
    // console.log(doctorEmail);

    const connection = await pool.getConnection();
    const [data] = await connection.query(
      sqlQueries.appointments.getByDoctorsEmail,
      [doctorEmail]
    );
    connection.release();
    // console.log(data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
