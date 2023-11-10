import pool from "@/app/(backend)/utils/db";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();

export async function GET(req, content) {
  try {
    if (content.params.id.includes("@gmail.com")) {
      const [data] = await connection.query(
        "SELECT*FROM appointments WHERE ref_email=?",
        [content.params.id]
      );
      connection.release();
      return NextResponse.json(data, { status: 200 });
    } else {
      const [data] = await connection.query(
        "SELECT*FROM appointments WHERE appt_id=?",
        [content.params.id]
      );
      connection.release();
      return NextResponse.json(data, { status: 200 });
    }

    // console.log(data);
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
