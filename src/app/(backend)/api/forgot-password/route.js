import pool from "@/app/(backend)/utils/db";
import { NextResponse } from "next/server";
import { sqlQueries } from "../../utils/sqlQueries";
import { transporter } from "../../utils/nodemailer";
import { generate } from "generate-password";
import bcrypt from "bcryptjs";

// Update Password
export async function PUT(req) {
  try {
    const email = await req.json();
    const newPassword = generate({
      length: 6,
      numbers: true,
    });
    const mail = await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Password",
      text: `New Password`,
      html: `
          <h1>New Password</h1>
          </br>
          <p>Password : ${newPassword}</p>
          </br>
          <p><small>Use this password to log into PHP Hospital</small></p>
          <p><small>You can reset this password going to your profile</small></p>
          <h3>Thank You!</h3>
        `,
    });

    const hashedPass = await bcrypt.hash(newPassword, 10);

    const connection = await pool.getConnection();
    await connection.query(sqlQueries?.forgotPassword?.updatePasswordByEmail, [
      hashedPass,
      email,
    ]);
    connection.release();

    return NextResponse.json("Password Updated", { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
