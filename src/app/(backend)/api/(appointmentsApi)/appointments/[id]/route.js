import pool from "@/app/(backend)/utils/db";
import { sqlQueries } from "@/app/(backend)/utils/sqlQueries";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();

export async function GET(req, content) {
  try {
    // Appointment By Reference Email [email which is used during booking appointment].
    if (content.params.id.includes("@gmail.com")) {
      const [data] = await connection.query(
        sqlQueries.appointments.getByEmail,
        [content.params.id]
      );
      connection.release();
      return NextResponse.json(data, { status: 200 });
    } else {
      // Appointment by Appointment Id
      const [data] = await connection.query(sqlQueries.appointments.getById, [
        content.params.id,
      ]);
      connection.release();
      return NextResponse.json(data, { status: 200 });
    }

    // console.log(data);
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function PUT(req, content) {
  try {
    const body = await req.json();
    const appt_id = content.params.id;
    // console.log(body, appt_id);

    // Updates appointment's Status, Prescription (uploaded or not), Test Preferences by Appointment Id
    await connection.query(
      sqlQueries.appointments.updateStatusPrescriptionTestPreferenceById,
      [body?.appt_status, body?.prescription, body?.test_preferences, appt_id]
    );

    return NextResponse.json({ message: "Update done!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
