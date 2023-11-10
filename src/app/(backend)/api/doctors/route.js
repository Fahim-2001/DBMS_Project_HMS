import pool from "@/app/(backend)/utils/db";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();

// All doctors information method.
export async function GET(req, res) {
  try {
    // Retrieving Data from database
    const [data] = await connection.query("SELECT * FROM doctors");
    connection.release();

    // console.log(data);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

// Doctor post method
export async function POST(req) {
  try {
    const user = await req.json();

    // console.log(user)

    // Sending Data to Database
    const data = await connection.query(
      "INSERT INTO doctors(first_name, last_name, email, phone_number, speciality, gender, role, picture, routename,available_from, available_to) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
      [
        user.firstname,
        user.lastname,
        user.email,
        user.phone_number,
        user.speciality,
        user.gender,
        user.role,
        user.profile_picture,
        user.routename,
        user.available_from,
        user.available_to
      ]
    );
    connection.release();
    
    return NextResponse.json({ message: "User Registered!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

// Doctor delete method
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    // console.log("User email : ", email);

    await connection.query("DELETE FROM doctors WHERE email=?", [email]);

    return NextResponse.json(
      { message: "Deletion Successful" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
