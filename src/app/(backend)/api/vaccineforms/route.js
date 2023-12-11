import pool from "@/app/(backend)/utils/db";
import { generate } from "generate-password";
import { NextResponse } from "next/server";
import { sqlQueries } from "../../utils/sqlQueries";

//All Registered Vaccine Info
export async function GET(req) {
  try {
    const connection = await pool.getConnection();
    const [data] = await connection.query(sqlQueries.vaccineforms.getAll);
    connection.release();

    // console.log(data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

// New Vaccine Information to the database.
export async function POST(req) {
  try {
    const {
      fullname,
      age,
      gender,
      contact,
      vaccine_name,
      shortname,
      email,
      status,
    } = await req.json();

    // Current Date
    const reg_date = `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`;

    // This token is generated to identify current request in the next query to generate pdf.
    const token = generate({
      length: 5,
      numbers: true,
    });

    const connection = await pool.getConnection();
    await connection.query(sqlQueries.vaccineforms.postNew, [
      fullname,
      age,
      gender,
      contact,
      vaccine_name,
      shortname,
      email,
      status,
      token,
      reg_date,
    ]);

    const data = await connection.query(sqlQueries.vaccineforms.getByToken, [
      token,
    ]);
    const vaccineInfo = data[0][0];

    connection.release();
    return NextResponse.json(
      vaccineInfo,
      { message: "Vaccine for submission done!" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error.message);
  }
}
