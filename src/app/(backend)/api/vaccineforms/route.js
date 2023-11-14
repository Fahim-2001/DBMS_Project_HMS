import pool from "@/app/(backend)/utils/db";
import { generate } from "generate-password";
import { NextResponse } from "next/server";
import { sqlQueries } from "../../utils/sqlQueries";

const connection = await pool.getConnection();

//All Registered Vaccine Info
export async function GET(req) {
  try {
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
    const reg_date = `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`;
    // This token is generated to identify current request in the next query to generate pdf.
    const token = generate({
      length: 5,
      numbers: true,
    });

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
    connection.release();

    const data = await connection.query(sqlQueries.vaccineforms.getByToken, [
      token,
    ]);
    const vaccineInfo = data[0][0];

    return NextResponse.json(
      vaccineInfo,
      { message: "Vaccine for submission done!" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error.message);
  }
}
