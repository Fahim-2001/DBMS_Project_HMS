import pool from "@/app/(backend)/utils/db";
import { sqlQueries } from "@/app/(backend)/utils/sqlQueries";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();
function isLowercase(departmentName) {
  return /^[a-z]+$/.test(departmentName);
}
export async function GET(req, content) {
  try {
    // Doctors By Department
    if(isLowercase(content.params.slug)){
      const [data] = await connection.query(sqlQueries.doctors.getByDepartment,[content.params.slug])
      connection.release();
      return NextResponse.json(data, { status: 200 });
    }

    // Doctor By Email
    if(content.params.slug.includes("@gmail.com")){
      const [data] = await connection.query(sqlQueries.doctors.getByEmail,[content.params.slug])
      connection.release();
      return NextResponse.json(data[0], { status: 200 });
    }

    // Doctor By Id
    const doc_id = content.params.slug;
    const [data] = await connection.query(
      sqlQueries.doctors.getById,
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
    const doc_id = content.params.slug;
    const body = await req.json();
    // console.log(doc_id, body)

    //Phone Number Update
    if (body.phone_number) {
      await connection.query(
        sqlQueries.doctors.updatePhoneNumberById,
        [body?.phone_number, doc_id]
      );
    }

    // Profile Picture Update
    if (body.profile_picture) {
      await connection.query(
        sqlQueries.doctors.updateProfilePictureById,
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
