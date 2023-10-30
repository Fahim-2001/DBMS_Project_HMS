import pool from "@/app/utils/db";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();

// Doctor By ID api
export async function GET(req){
    try {
        const url = new URL(req.url)
        const email = url.searchParams.get('email')
        
        // Retrieving Data from database
        const [data] = await connection.query(`SELECT * FROM doctors WHERE email=?`,[email]);
        connection.release();
        
        // console.log(data);
        return NextResponse.json(data[0], {status:200});
    } catch (error) {
        return NextResponse.json(error.message, {status: 500});
    }
  }