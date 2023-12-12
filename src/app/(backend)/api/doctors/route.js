import pool from "@/app/(backend)/utils/db";
import { NextResponse } from "next/server";
import { sqlQueries } from "../../utils/sqlQueries";
import { transporter } from "../../utils/nodemailer";

// All doctors information method.
export async function GET(req, res) {
  try {
    // Retrieving Data from database
    const connection = await pool.getConnection();
    const [data] = await connection.query(sqlQueries.doctors.getAll);
    connection.release();

    // console.log(data);

    return NextResponse.json(data || [], { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

//New Doctor POST to DB
export async function POST(req) {
  try {
    const doctor = await req.json();

    console.log(doctor);

    const mail = await transporter.sendMail({
      from: process.env.EMAIL,
      to: doctor?.email,
      subject: "Welcome Message",
      text: `Welcome ${doctor?.firstname} to PHP Hospital`,
      html: `
        <h1>Hello ${doctor?.firstname}, cordial welcome to PHP Hospital ❤️</h1>
        <h3>Your Credentials</h3>
        </br>
        <p>Password : ${doctor?.password}</p>
        </br>
        <p><small>Use this password to log into PHP Hospital</small></p>
        <p><small>You can reset this password going to your profile</small></p>
        <h3>Thank You!</h3>
      `,
    });
    // console.log("Successfully sent credentials " + mail.messageId);

    const connection = await pool.getConnection();
    await connection.query(sqlQueries.doctors.postNew, [
      doctor.firstname,
      doctor.lastname,
      doctor.email,
      doctor.phone_number,
      doctor.speciality,
      doctor.gender,
      doctor.role,
      doctor.profile_picture,
      doctor.routename,
      doctor.available_from,
      doctor.available_to,
    ]);
    connection.release();

    return NextResponse.json({ message: "User Registered!" }, { status: 201 });
  } catch (error) {
    console.log(error.message)
    return NextResponse.json(error.message, { status: 500 });
  }
}

// Doctor delete method
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    // console.log("User email : ", email);

    const connection = await pool.getConnection();
    await connection.query(sqlQueries.doctors.deleteByEmail, [email]);
    connection.release();
    return NextResponse.json(
      { message: "Deletion Successful" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
