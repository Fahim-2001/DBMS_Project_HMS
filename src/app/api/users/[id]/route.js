import pool from "@/app/utils/db";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();

// User By ID api
export async function GET(req, content) {
  try {
    const userId = content.params.id;

    // Retrieving Data from database
    const [data] = await connection.query(`SELECT * FROM users WHERE id=?`, [
      userId,
    ]);
    connection.release();

    // console.log(data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function PUT(req, content) {
  try {
    const userId = content.params.id;
    const body = await req.json();
    // console.log(body);

    await connection.query(`UPDATE users SET picture=? WHERE id=?`, [
      body,
      userId,
    ]);
    connection.release();

    return NextResponse.json({ message: "Update Successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
