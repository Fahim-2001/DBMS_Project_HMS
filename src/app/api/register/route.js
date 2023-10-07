const { default: pool } = require("@/app/utils/db");
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";

const connection = await pool.getConnection();

// Post a user api
export async function POST(req){
    try {
        const user = await req.json();

        // console.log(user)
        
        const hpass = await bcrypt.hash(user.password, 10);

        // Sending Data to Database
        await connection.query('INSERT INTO users(fullname,email,password,userRole,gender,picture) VALUES(?,?,?,?,?,?)',[user.name, user.email, hpass,user.userRole, user.gender,user.picture]);
        connection.release();
        
        return NextResponse.json({message : "User Registered!"}, {status : 201});
    } catch (error) {
        return NextResponse.json(error.message, {status: 500});
    }
}