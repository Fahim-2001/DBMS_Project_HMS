import pool from "@/app/(backend)/utils/db";
import { sqlQueries } from "@/app/(backend)/utils/sqlQueries";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();

// Doctor By ID
export async function GET(req, content) {
  try {
    const doc_id = content.params.id;

    // Doctor By Email
    if(content.params.id.includes("@gmail.com")){
      const [data] = await connection.query(sqlQueries.doctor.getByEmail,[content.params.id])
      connection.release();
      return NextResponse.json(data[0], { status: 200 });
    }

    // Retrieving Data from database
    const [data] = await connection.query(
      sqlQueries.doctor.getById,
      [doc_id]
    );
    connection.release();

    // console.log(data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function PUT(req, content) {
  try {
    const doc_id = content.params.id;
    const body = await req.json();
    // console.log(doc_id, body)

    //Phone Number Update
    if (body.phone_number) {
      await connection.query(
        sqlQueries.doctor.updatePhoneNumber,
        [body?.phone_number, doc_id]
      );
    }

    // Profile Picture Update
    if (body.profile_picture) {
      await connection.query(
        sqlQueries.doctor.updateProfilePicture,
        [body?.profile_picture, doc_id]
      );
    }
    connection.release();

    // console.log(data);
    return NextResponse.json({ message: "Update Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
