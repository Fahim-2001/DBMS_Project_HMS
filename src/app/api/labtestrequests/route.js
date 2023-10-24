import pool from "@/app/utils/db";
import { NextResponse } from "next/server";

const connection = await pool.getConnection();

// Doctor By ID api
export async function GET(req) {
  try {
    // const [data] = await connection.query("SELECT*FROM vaccineforms");
    // connection.release();
    // console.log(data);
    const data=[]
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const labtest = await req.json();
    console.log(labtest)
    

    return NextResponse.json(
      { message: "Lab Test submission done!" },
      { status: 201 }
    );
  } catch (error) {
    NextResponse.json({ message: error.message }, { status: 500 });
  }
}
