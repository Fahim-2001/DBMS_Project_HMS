import pool from "@/app/(backend)/utils/db";
import { sqlQueries } from "@/app/(backend)/utils/sqlQueries";
import { NextResponse } from "next/server";



// Doctor By ID api
export async function GET(req, content) {
  try {
    const connection = await pool.getConnection();
    // Lab Report By Email used during registration
    if (content.params.slug.includes("@gmail.com")) {
      const [data] = await connection.query(
        sqlQueries.labtests.getByEmail,
        [content.params.slug]
      );
      connection.release();
      return NextResponse.json(data || [], { status: 200 });
    } else {
      // Lab Report By Id
      const [data] = await connection.query(
        sqlQueries.labtests.getByUniqueId,
        [content.params.slug]
      );
      connection.release();
      return NextResponse.json(data[0] ||{}, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function PUT(req, content) {
  try {
    const body = await req.json();
    const unique_id = content.params.slug;
    const reports = JSON.stringify(body.reports);
    // console.log(reports, body.report_status, unique_id);
    // console.log(unique_id, body);

    const connection = await pool.getConnection();
    if (body.payment_status === "Paid") {
      await connection.query(
        sqlQueries.labtests.updatePaymentStatusByUniqueId,
        [body?.payment_status, body?.due_amount, unique_id]
      );
      connection.release();
    }

    if (body.reports) {
      await connection.query(
        sqlQueries.labtests.updateReportByUniqueId,
        [body?.report_status, reports, unique_id]
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
