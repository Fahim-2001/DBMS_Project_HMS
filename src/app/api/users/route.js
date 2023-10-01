import pool from "@/app/utils/db";
import { NextResponse } from "next/server";

// All User Info API
export async function GET(req,res){
    try {
        // Retrieving Data from database
        const connection = await pool.getConnection();
        const [data] = await connection.query('SELECT * FROM users');
        connection.release();
        
        const users = JSON.stringify(data);
        // console.log(users);
        return NextResponse.json(users, {status:200});
    } catch (error) {
        return NextResponse.json(error.message, {status: 500});
    }
}
