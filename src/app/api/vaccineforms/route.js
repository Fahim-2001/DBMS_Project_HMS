import pool from "@/app/utils/db";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();

// Doctor By ID api
export async function GET(req) {
  try {
    const [data] = await connection.query("SELECT*FROM vaccineforms");
    connection.release();
    // console.log(data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { fullname, age, gender, contact, vaccine_name, shortname } =
      await req.json();
    // console.log(vaccineHolder);
    const data = await connection.query(
      "INSERT INTO vaccineforms(fullname,age,gender,contact,vaccine_name,shortname) VALUE (?,?,?,?,?,?)",
      [fullname, age, gender, contact, vaccine_name, shortname]
    );
    connection.release();
    console.log(data);
    return NextResponse.json(
      { message: "Vaccine for submission done!" },
      { status: 201 }
    );
  } catch (error) {
    NextResponse.json({ message: error.message }, { status: 500 });
  }
}
