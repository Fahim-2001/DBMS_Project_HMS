import pool from "@/app/(backend)/utils/db";

const connection = await pool.getConnection();


export async function POST(req, content) {
  try {
    const tran_id = content.params.tran_id;
    // console.log(tran_id);

    await connection.query('DELETE FROM appointments WHERE tran_id=?',[tran_id]);
    connection.release()

    
    return Response.redirect(`http://localhost:3000/payment/failed/${tran_id}`)
  } catch (error) {
    console.log(error.message);
  }
}
