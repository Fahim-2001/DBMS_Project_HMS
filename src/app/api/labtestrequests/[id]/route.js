import pool from "@/app/utils/db";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();

// Doctor By ID api
export async function GET(req,content) {
  try {
    
    const [data] = await connection.query("SELECT*FROM lab_test_requests WHERE id=?",[content?.params?.id]);
    connection.release();
    // console.log(data);

    return NextResponse.json(data[0], { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}