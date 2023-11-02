import pool from "@/app/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();

// User By ID api
export async function GET(req, content) {
  try {
    const userId = content.params.id;

    // Retrieving Data from database
    const [user] = await connection.query(`SELECT * FROM users WHERE id=?`, [
      userId,
    ]);
    connection.release();

    // console.log(user);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function PUT(req, content) {
  try {
    const userId = content.params.id;
    const body = await req.json();

    // Password Reset Operation
    if (body.old_pass && body.new_pass) {
      const [user] = await connection.query(`SELECT * FROM users WHERE id=?`, [
        userId,
      ]);

      // Password comparison
      const didMatched = await bcrypt.compare(body.old_pass, user[0].password);

      // Sending message if password do not matches.
      if (!didMatched) {
        return NextResponse.json(
          { message: "Old Password Didn't Matched" },
          { status: 500 }
        );
      }

      // // Password Hashing
      const password = await bcrypt.hash(body?.new_pass, 10);
      // Updating password
      await connection.query(`UPDATE users SET password=? WHERE id=?`, [
        password,
        userId,
      ]);
      connection.release();
    }

    // Update Profile Picture Operation
    if (body?.phone_number && body?.address && body?.picture) {
      await connection.query(
        `UPDATE users SET phone_number=?,address=?, picture=? WHERE id=?`,
        [body?.phone_number, body?.address, body?.picture, userId]
      );
      connection.release();
    } else if (body?.phone_number && body?.address) {
      await connection.query(
        `UPDATE users SET phone_number=?,address=? WHERE id=?`,
        [body?.phone_number, body?.address, userId]
      );
      connection.release();
    } else if (body?.address && body?.picture) {
      await connection.query(
        `UPDATE users SET address=?, picture=? WHERE id=?`,
        [body?.address, body?.picture, userId]
      );
      connection.release();
    } else if (body?.phone_number && body?.picture) {
      await connection.query(
        `UPDATE users SET phone_number=?, picture=? WHERE id=?`,
        [body?.phone_number, body?.picture, userId]
      );
      connection.release();
    } else if (body?.phone_number) {
      await connection.query(`UPDATE users SET phone_number=? WHERE id=?`, [
        body?.phone_number,
        userId,
      ]);
      connection.release();
    } else if (body?.address) {
      await connection.query(`UPDATE users SET address=? WHERE id=?`, [
        body?.address,
        userId,
      ]);
      connection.release();
    } else if (body?.picture) {
      await connection.query(`UPDATE users SET picture=? WHERE id=?`, [
        body,
        userId,
      ]);
      connection.release();
    }

    return NextResponse.json({ message: "Update Successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
