import pool from "@/app/(backend)/utils/db";
import { sqlQueries } from "@/app/(backend)/utils/sqlQueries";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();

// Doctor By ID api
export async function GET(req,content) {
  try {
    // console.log(content.params)
    const [data] = await connection.query(
        sqlQueries.labtests.getByEmailAndId,
        [content.params.slug[0], content.params.slug[1]]
      );
      connection.release();
    

    return NextResponse.json(data[0], { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}