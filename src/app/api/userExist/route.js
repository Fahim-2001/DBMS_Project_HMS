import pool from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const email= await req.json();
        // console.log("Incoming Email :", email);

        const connection = await pool.getConnection();
        const userEmail = await connection.query(`SELECT * FROM users WHERE email = '${email}'`)
        connection.release();

        let existingEmail=userEmail[0][0].email;
        // console.log("Outgoing email :",existingEmail);
        
        return NextResponse.json(existingEmail, {message : "User Registered!"}, {status : 201});
    } catch (error) {
        return NextResponse.json(error.message, {status: 500});
    }
}