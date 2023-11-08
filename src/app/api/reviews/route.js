import pool from "@/app/utils/db";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();

// All Reviews get method.
export async function GET(req, res) {
  try {
    // Retrieving Data from database
    const [data] = await connection.query("SELECT * FROM reviews");
    connection.release();

    // console.log(data);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

// Review post method
export async function POST(req) {
  try {
    const review = await req.json();

    // console.log(review)

    // Sending Data to Database
    const data = await connection.query(
      "INSERT INTO reviews(name, email, comment) VALUES(?,?,?)",
      [
        review.name,
        review.email,
        review.comment
      ]
    );
    connection.release();

    return NextResponse.json({ message: "Review Registered!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
