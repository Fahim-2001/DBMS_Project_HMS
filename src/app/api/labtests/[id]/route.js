import pool from "@/app/utils/db";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();

// Doctor By ID api
export async function GET(req, content) {
  try {
    const [data] = await connection.query("SELECT*FROM lab_tests WHERE id=?", [
      content?.params?.id,
    ]);
    connection.release();
    // console.log(data);

    return NextResponse.json(data[0], { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function PUT(req, content) {
  try {
    const body = await req.json();
    const id = content.params.id;
    const reports = JSON.stringify(body.reports);
    // console.log(reports, body.report_status, id);

    await connection.query(
      "UPDATE lab_tests SET report_status=?, report=? WHERE id=?",
      [body?.report_status, reports, id]
    );
    connection.release();

    return NextResponse.json(
      { message: "Report Submission done!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
