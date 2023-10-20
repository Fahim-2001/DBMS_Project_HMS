import pool from "@/app/utils/db";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();

// Doctor By ID api
export async function GET(req,content){
    try {
        const doc_id = content.params.id;
        
        // Retrieving Data from database
        const [data] = await connection.query(`SELECT * FROM doctors WHERE doc_id=?`,[doc_id]);
        connection.release();
        
        // console.log(data);
        return NextResponse.json(data, {status:200});
    } catch (error) {
        return NextResponse.json(error.message, {status: 500});
    }
  }