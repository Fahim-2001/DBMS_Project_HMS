import pool from "@/app/(backend)/utils/db";
import { NextResponse } from "next/server";
import { sqlQueries } from "../../utils/sqlQueries";
import { generateUniqueCode } from "../../utils/generateUniqueCode";



// Doctor By ID api
export async function GET(req) {
  try {
    const connection = await pool.getConnection();
    const [data] = await connection.query(sqlQueries.labtests.getAll);
    connection.release();
    // console.log("From API ->",data);

    return NextResponse.json(data || [], { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const labtest = await req.json();
    // console.log(labtest);
    const tests = JSON.stringify(labtest?.tests);

    const unique_id = generateUniqueCode();

    // console.log(labtest, unique_id);

    const connection = await pool.getConnection();
    await connection.query(
      sqlQueries.labtests.postNew,
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
        labtest?.report_status,
        unique_id
      ]
    );
    connection.release();
    return NextResponse.json(
      { message: "Lab Test submission done!", unique_id },
      { status: 201 }
    );
  } catch (error) {
    console.log(error.message)
    NextResponse.json({ message: error.message }, { status: 500 });
  }
}
