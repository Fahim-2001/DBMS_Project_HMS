import pool from "@/app/(backend)/utils/db";
import { NextResponse } from "next/server";
import { sqlQueries } from "../../../utils/sqlQueries";

const connection = await pool.getConnection();

// Doctor By ID api
export async function GET(req) {
  try {
    const [data] = await connection.query(
      sqlQueries.appointments.getAll
    );
    connection.release();
    // console.log(data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const patient = await req.json();

    await connection.query(
      sqlQueries.appointments.postNew,
      [
        patient?.patient_name,
        patient?.patient_age,
        patient?.patient_contact,
        patient?.patient_gender,
        patient?.patient_address,
        patient?.doc_id,
        patient?.ref_doctor,
        patient?.department,
        patient?.appt_type,
        patient?.appt_date,
        patient?.short_description,
        patient?.fee,
        patient?.doc_email,
        patient?.appt_status,
        patient?.ref_email,
      ]
    );
    return NextResponse.json({ message: "Appointment done!" }, { status: 201 });
  } catch (error) {
    NextResponse.json({ message: error.message }, { status: 500 });
  }
}
