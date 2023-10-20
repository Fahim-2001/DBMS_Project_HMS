import pool from "@/app/utils/db";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();

// Doctor By ID api
export async function GET(req) {
  try {
    const [data] = await connection.query('SELECT*FROM appointments');
    connection.release()
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
      "INSERT INTO appointments(patient_name, patient_age,patient_contact, patient_gender, patient_address, doc_id, ref_doctor, department, appt_type,appt_date,patient_issue,appt_fee,doc_email,appt_status) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
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
        patient?.appt_status
      ]
    );
    return NextResponse.json({ message: "Appointment done!" }, { status: 201 });
  } catch (error) {
    NextResponse.json({ message: error.message }, { status: 500 });
  }
}
