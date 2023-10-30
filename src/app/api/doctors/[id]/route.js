import pool from "@/app/utils/db";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();

// Doctor By ID api
export async function GET(req, content) {
  try {
    const doc_id = content.params.id;

    // Retrieving Data from database
    const [data] = await connection.query(
      `SELECT * FROM doctors WHERE doc_id=?`,
      [doc_id]
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
    const doc_id = content.params.id;
    const body = await req.json();
    // console.log(doc_id, body)

    
    await connection.query(`UPDATE doctors SET phone_number=?, picture=? WHERE doc_id=?`,[body?.phone_number, body?.profile_picture, doc_id]);
    connection.release();

    // console.log(data);
    return NextResponse.json({message:"Update Success"}, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
