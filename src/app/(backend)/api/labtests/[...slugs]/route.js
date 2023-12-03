import pool from "@/app/(backend)/utils/db";
import { sqlQueries } from "@/app/(backend)/utils/sqlQueries";
import { NextResponse } from "next/server";



export async function GET(req,content) {
  try {
    // Lab Report by user's email and appointment id.
    const connection = await pool.getConnection();
    const [data] = await connection.query(
        sqlQueries.labtests.getByEmailAndId,
        [content.params.slugs[0], content.params.slugs[1]]
      );
      connection.release();
    return NextResponse.json(data[0] || {}, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}