import pool from "@/app/(backend)/utils/db";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();


export async function GET(req, content) {
    try {
      const [data] = await connection.query('SELECT * FROM appointments WHERE tran_id=?',[content.params.tran_id]);
      connection.release();
        console.log(data)
      return NextResponse.json(data[0],{ 
        status: 201,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

export async function POST(req, content) {
  try {
    const tran_id = content.params.tran_id;
    // console.log(tran_id);

    await connection.query('DELETE FROM appointments WHERE tran_id=?',[tran_id]);
    connection.release()

    return NextResponse.json({
      message: "Appointment Deleted",
      status: 201,
    });
  } catch (error) {
    console.log(error.message);
  }
}
