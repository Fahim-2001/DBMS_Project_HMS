import pool from "@/app/(backend)/utils/db";
import { NextResponse } from "next/server";
import { sqlQueries } from "../../utils/sqlQueries";
import bcrypt from "bcryptjs";

// All Users
export async function GET(req, res) {
  try {
    // Retrieving Data from database
    const connection = await pool.getConnection();
    const [data] = await connection.query(
      sqlQueries.users.getAll
    );
    connection.release();

    // console.log(data);
    return NextResponse.json(data || [], { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

// New Users Data POSTing to Database
export async function POST(req) {
  try {
    const user = await req.json();
    
    const hashedPass = await bcrypt.hash(user.password, 10);

    // Sending Data to Database
    const connection = await pool.getConnection();
    await connection.query(
      sqlQueries.users.postNew,
      [
        user.name,
        user.email,
        hashedPass,
        user.userRole,
        user.gender,
        user.picture,
      ]
    );
    connection.release();

    return NextResponse.json({ message: "User Registered!" }, { status: 201 });
  } catch (error) {
    console.log(error.message)
    return NextResponse.json(error.message, { status: 500 });
  }
}

// Delete a user by email.
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    // console.log("User email : ", email);
    
    const connection = await pool.getConnection();
    await connection.query(sqlQueries.users.deleteByEmail, [email]);
    connection.release()

    return NextResponse.json(
      { message: "Deletion Successful" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
