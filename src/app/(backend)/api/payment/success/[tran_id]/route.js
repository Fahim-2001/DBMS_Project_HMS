import pool from "@/app/(backend)/utils/db";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();

export async function GET(req, content) {
  try {
    const tran_id = content.params.tran_id;
    const [data] = await connection.query(
      "SELECT * FROM appointments WHERE tran_id=?",
      [tran_id]
    );
    connection.release();

    return NextResponse.json(data[0], {status:200});
  } catch (error) {
    console.log(error.message);
  }
}

export async function POST(req, content) {
  try {
    const tran_id = content.params.tran_id;
    // console.log(tran_id);

    await connection.query("UPDATE appointments SET paid=? WHERE tran_id=?", [
      true,
      tran_id,
    ]);
    connection.release();
    
    return Response.redirect(`http://localhost:3000/payment/success/${tran_id}`)
  } catch (error) {
    console.log(error.message);
  }
}
