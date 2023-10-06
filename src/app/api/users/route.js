import pool from "@/app/utils/db";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();

// All User Info API
export async function GET(req, res) {
  try {
    // Retrieving Data from database
    const [data] = await connection.query("SELECT * FROM users");
    connection.release();

    // console.log(data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

// Post API to fetch user by email.
export async function POST(req) {
  try {
    const user = await req.json();

    await connection.query(
      `UPDATE users SET userRole='${user?.userRole}' WHERE email='${user?.email}'`
    );

    return NextResponse.json({ message: "Update Successful" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    // console.log("User email : ", email);

    await connection.query("DELETE FROM users WHERE email=?", [email]);

    return NextResponse.json(
      { message: "Deletion Successful" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
