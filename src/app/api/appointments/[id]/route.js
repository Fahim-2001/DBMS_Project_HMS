import pool from "@/app/utils/db";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();

export async function GET(req, content) {
  try {
    const [data] = await connection.query(
      "SELECT*FROM appointments WHERE appt_id=?",
      [content.params.id]
    );
    connection.release();

    // console.log(data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function PUT(req, content) {
  try {
    const body = await req.json();
    const appt_id = content.params.id;
    // console.log(body, appt_id);

    await connection.query(
      `UPDATE appointments SET appt_status=?, prescription=?, test_preferences=? WHERE appt_id=?`,
      [body?.appt_status, body?.prescription, body?.test_preferences, appt_id]
    );

    return NextResponse.json({ message: "Update done!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
