import pool from "@/app/(backend)/utils/db";
import { sqlQueries } from "@/app/(backend)/utils/sqlQueries";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();

// Deparmentwise doctor information 
export async function GET(req){
    try {
        const url = new URL(req.url)
        const department = url.searchParams.get('department')
        // console.log(department)

        
        const [data] = await connection.query(sqlQueries.doctor.getByDepartment,[department]);
        connection.release();
        
        // console.log(data);
        return NextResponse.json(data, {status:200});
    } catch (error) {
        return NextResponse.json(error.message, {status: 500});
    }
  }