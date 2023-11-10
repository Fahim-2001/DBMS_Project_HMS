import pool from "@/app/(backend)/utils/db";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();
// Deparmentwise doctor information method
export async function GET(req){
    try {
        const url = new URL(req.url)
        const department = url.searchParams.get('department')
        // console.log(department)
        // Retrieving Data from database
        const [data] = await connection.query(`SELECT * FROM doctors WHERE routename=?`,[department]);
        connection.release();
        
        // console.log(data);
        return NextResponse.json(data, {status:200});
    } catch (error) {
        return NextResponse.json(error.message, {status: 500});
    }
  }