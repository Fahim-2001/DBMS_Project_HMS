import pool from "@/app/utils/db";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();

// Doctor By ID api
export async function GET(req) {
  try {
    const [data] = await connection.query("SELECT*FROM lab_tests");
    connection.release();
    // console.log("From API ->",data);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const labtest = await req.json();
    console.log(labtest);
    const tests = JSON.stringify(labtest?.tests);

    await connection.query(
      "INSERT INTO lab_tests(fullname,age,gender,contact,email,number_of_tests, tests,registered_by,registers_email,payable_amount,advanced_amount,due_amount,payment_status,report_status) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        labtest?.fullname,
        labtest?.age,
        labtest?.gender,
        labtest?.contact,
        labtest?.email,
        labtest?.number_of_tests,
        tests,
        labtest?.registered_by,
        labtest?.registers_email,
        labtest?.payable_amount,
        labtest?.advanced_amount,
        labtest?.due_amount,
        labtest?.payment_status,
        labtest?.report_status
      ]
    );
    connection.release();
    return NextResponse.json(
      { message: "Lab Test submission done!" },
      { status: 201 }
    );
  } catch (error) {
    NextResponse.json({ message: error.message }, { status: 500 });
  }
}
