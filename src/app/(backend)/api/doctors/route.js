import pool from "@/app/(backend)/utils/db";
import { NextResponse } from "next/server";
import { sqlQueries } from "../../utils/sqlQueries";
import { transporter } from "../../utils/nodemailer";


const connection = await pool.getConnection();

// All doctors information method.
export async function GET(req, res) {
  try {
    // Retrieving Data from database
    const [data] = await connection.query(
      sqlQueries.doctors.getAll
    );
    connection.release();

    // console.log(data);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

//New Doctor POST to DB
export async function POST(req) {
  try {
    const user = await req.json();

    console.log(user)

    const mail = await transporter.sendMail({
      from: process.env.EMAIL,
      to: user?.email,
      subject:'Welcome Message',
      text: `Welcome ${user?.firstname} to PHP Hospital`,
      html:`
        <h1>Hello ${user?.firstname}</h1>
        <h3>Credentials</h3>
        </br>
        <p>Password : ${user?.password}</p>
        </br>
        <small>Use this password to log into PHP Hospital</small>
        <small>You can reset this password going to your profile</small>
        <h3>Thank You!</h3>
      `
    })
    console.log("Successfully sent credentials "+mail.messageId);
    
    await connection.query(sqlQueries.doctors.postNew, [
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
      user.available_to,
    ]);
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

    await connection.query(sqlQueries.doctors.deleteByEmail, [
      email,
    ]);
    connection.release();
    return NextResponse.json(
      { message: "Deletion Successful" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
