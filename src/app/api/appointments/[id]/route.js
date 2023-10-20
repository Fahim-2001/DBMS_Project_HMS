import pool from "@/app/utils/db";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();
export async function PUT(req,content){
    try {
      const status = await req.json()
      const appt_id=content.params.id;
    //   console.log(status);
    //   console.log(appt_id)

      await connection.query(`UPDATE appointments SET appt_status=? WHERE appt_id=?`,[status,appt_id]);

      return NextResponse.json({ message: "Update done!" }, { status: 201 });
    } catch (error) {
        return NextResponse.json(error.message, { status: 500 });
    }
  }