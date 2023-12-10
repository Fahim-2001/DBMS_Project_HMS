import pool from "@/app/(backend)/utils/db";
import { NextResponse } from "next/server";
import { sqlQueries } from "../../../utils/sqlQueries";

const date = new Date();

// Doctor By ID api
export async function GET(req) {
  try {
    const connection = await pool.getConnection();
    const [data] = await connection.query(sqlQueries.appointments.getAll);
    connection.release();
    // console.log(data);
    return NextResponse.json(data || [], { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function POST(req, res) {
  try {
    const patient = await req.json();
    patient.booking_date = `${date.getDate()}/${date.getUTCMonth()}/${date.getFullYear()}`;
    patient.tran_id = null;
    console.log(patient);

    const connection = await pool.getConnection();
    await connection.query(sqlQueries.appointments.postNew, [
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
      patient?.patient_issue,
      patient?.appt_fee,
      patient?.doc_email,
      patient?.appt_status,
      patient?.ref_email,
      patient?.paid,
      patient?.payment_method,
      patient?.booking_date,
      patient?.tran_id,
      patient?.appt_time,
      patient?.unique_id,
    ]);

    connection.release();

    return NextResponse.json({ message: "Appointment Done", status: 201 });
  } catch (error) {
    console.log(error.message);
    NextResponse.json({ message: error.message }, { status: 500 });
  }
}
