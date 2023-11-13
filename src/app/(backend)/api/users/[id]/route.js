import pool from "@/app/(backend)/utils/db";
import { sqlQueries } from "@/app/(backend)/utils/sqlQueries";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();

// User By ID
export async function GET(req, content) {
  try {
    const userId = content.params.id;

    if(content.params.id.includes('@gmail.com')){
      const [user] = await connection.query(
        sqlQueries.usersApiQueries.getUserByEmail,
        [userId]
      );
      connection.release();
      return NextResponse.json(user[0], {status:200});
    }

    // Retrieving Data from database
    const [user] = await connection.query(
      sqlQueries.usersApiQueries.getUserById,
      [userId]
    );
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
    console.log(body);

    // Users Role Update
    if (body?.userRole != null) {
      await connection.query(sqlQueries.usersApiQueries.updateUserRoleById, [
        body?.userRole,
        userId,
      ]);
      connection.release();
    }

    // Password Reset Operation
    if (body.old_pass && body.new_pass) {
      const [user] = await connection.query(
        sqlQueries.usersApiQueries.getUserById,
        [userId]
      );

      // Password comparison
      const didMatched = await bcrypt.compare(body.old_pass, user[0].password);

      // Sending message if password do not matches.
      if (!didMatched) {
        return NextResponse.json(
          { message: "Old Password Didn't Matched" },
          { status: 500 }
        );
      }

      //New Password Hashing
      const password = await bcrypt.hash(body?.new_pass, 10);
      // Updating password
      await connection.query(
        sqlQueries.usersApiQueries.updateUserPasswordById,
        [password, userId]
      );
      connection.release();
    }

    // Update Phone Number by Id.
    if (body?.phone_number) {
      await connection.query(
        sqlQueries.usersApiQueries.updateUserPhoneNumberById,
        [body?.phone_number, userId]
      );
      connection.release();
    }

    // Update Address by Id.
    if (body?.address) {
      await connection.query(sqlQueries.usersApiQueries.updateUserAddressById, [
        body?.address,
        userId,
      ]);
      connection.release();
    }

    // // Update Profile Picture by Id.
    if (body?.picture) {
      await connection.query(sqlQueries.usersApiQueries.updateUserProfilePictureById, [
        body?.picture,
        userId,
      ]);
      connection.release();
    }

    return NextResponse.json({ message: "Update Successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
