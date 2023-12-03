import pool from "@/app/(backend)/utils/db";
import { sqlQueries } from "@/app/(backend)/utils/sqlQueries";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// User By ID
export async function GET(req, content) {
  try {
    const userId = content.params.id;
    const connection = await pool.getConnection();

    // USER by EMAIL
    if (content.params.id.includes("@gmail.com")) {
      const [user] = await connection.query(sqlQueries.users.getByEmail, [
        userId,
      ]);
      connection.release();
      return NextResponse.json(user[0] || {}, { status: 200 });
    }

    // Retrieving Data from database
    const [user] = await connection.query(sqlQueries.users.getById, [userId]);
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
    // console.log(body);

    const connection = await pool.getConnection();

    // Users Role Update
    if (body?.userRole != null) {
      await connection.query(sqlQueries.users.updateRoleById, [
        body?.userRole,
        userId,
      ]);
    }

    // Password Reset Operation
    if (body.old_pass && body.new_pass) {
      const [user] = await connection.query(sqlQueries.users.getById, [userId]);

      // Password comparison
      const didMatch = await bcrypt.compare(body.old_pass, user[0].password);

      // Sending message if password do not matches.
      if (!didMatch) {
        return NextResponse.json(
          { message: "Old Password Didn't Matched" },
          { status: 500 }
        );
      }

      //New Password Hashing
      const password = await bcrypt.hash(body?.new_pass, 10);
      // Updating password
      await connection.query(sqlQueries.users.updatePasswordById, [
        password,
        userId,
      ]);
    }

    // Update Phone Number by Id.
    if (body?.phone_number) {
      await connection.query(sqlQueries.users.updatePhoneNumberById, [
        body?.phone_number,
        userId,
      ]);
    }

    // Update Address by Id.
    if (body?.address) {
      await connection.query(sqlQueries.users.updateAddressById, [
        body?.address,
        userId,
      ]);
    }

    // // Update Profile Picture by Id.
    if (body?.picture) {
      await connection.query(sqlQueries.users.updateProfilePictureById, [
        body?.picture,
        userId,
      ]);
    }

    connection.release();
    return NextResponse.json({ message: "Update Successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
