import pool from "@/app/(backend)/utils/db";
import { sqlQueries } from "@/app/(backend)/utils/sqlQueries";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();
export async function PUT(req, content) {
  try {
    const status = await req.json();
    const id = content.params.id;
    // console.log(status);
    // console.log(id)

    await connection.query(sqlQueries.vaccineforms.updateStatusById, [
      status,
      id,
    ]);

    return NextResponse.json({ message: "Update done!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
