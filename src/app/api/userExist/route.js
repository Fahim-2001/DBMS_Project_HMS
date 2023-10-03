import pool from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET(req, res){
    try {
        const email= await req.query.email;
        console.log("Incoming Email :", email);

        const connection = await pool.getConnection();
        const userData = await connection.query(`SELECT * FROM users WHERE email = '${email}'`)
        connection.release();

        let user=userData[0][0];
        console.log("Outgoing email :",user);
        
        return NextResponse.json(user, {message : "User Exist"}, {status : 201});
    } catch (error) {
        return NextResponse.json(error.message, {status: 500});
    }
}

export async function POST(req){
    try {
        const email= await req.json();
        // console.log("Incoming Email :", email);

        const connection = await pool.getConnection();
        const userData = await connection.query(`SELECT * FROM users WHERE email = '${email}'`)
        connection.release();

        let user=userData[0][0];
        // console.log("Outgoing email :",user);
        
        return NextResponse.json(user, {message : "User Registered!"}, {status : 201});
    } catch (error) {
        return NextResponse.json(error.message, {status: 500});
    }
}