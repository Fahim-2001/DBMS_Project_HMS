import pool from "@/app/(backend)/utils/db";
import { NEXT_BUILTIN_DOCUMENT } from "next/dist/shared/lib/constants";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();

// Doctor By ID api
export async function GET(req, content) {
  try {
    if (content.params.slug.includes("@gmail.com")) {
      const [data] = await connection.query(
        "SELECT*FROM lab_tests WHERE email=?",
        [content.params.slug]
      );
      connection.release();
      return NextResponse.json(data, { status: 200 });
    } else {
      const [data] = await connection.query(
        "SELECT*FROM lab_tests WHERE id=?",
        [content.params.slug]
      );
      connection.release();
      return NextResponse.json(data, { status: 200 });
    }
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

    // console.log(id, body);

    if (body.payment_status === "Paid") {
      await connection.query(
        "UPDATE lab_tests SET payment_status=?, due_amount=? WHERE id=?",
        [body?.payment_status, body?.due_amount, id]
      );
      connection.release();
    }

    if (body.reports) {
      await connection.query(
        "UPDATE lab_tests SET report_status=?, report=? WHERE id=?",
        [body?.report_status, reports, id]
      );
      connection.release();
    }

    return NextResponse.json(
      { message: "Report Submission done!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
