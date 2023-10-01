const { default: pool } = require("@/app/utils/db");
import bcrypt from 'bcryptjs';
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

// Post a user api
export async function POST(req){
    try {
        const user = await req.json();

        // console.log(user)
        
        const hpass = await bcrypt.hash(user.password, 10);

        // Sending Data to Database
        const connection = await pool.getConnection();
        await connection.query('INSERT INTO users(fullname,email,password,userRole,gender) VALUES(?,?,?,?,?)',[user.name, user.email, hpass,user.userRole, user.gender]);
        connection.release();
        
        return NextResponse.json({message : "User Registered!"}, {status : 201});
    } catch (error) {
        return NextResponse.json(error.message, {status: 500});
    }
}