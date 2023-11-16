import pool from "@/app/(backend)/utils/db";
import { NextResponse } from "next/server";
// import { sqlQueries } from "../../../utils/sqlQueries";
import {
  SSLCommerzPayment,
  is_live,
  store_id,
  store_passwd,
} from "@/app/(backend)/utils/sslCommerz";
import { sqlQueries } from "../../utils/sqlQueries";

const connection = await pool.getConnection();
const date = new Date();

export async function POST(req, res) {
    try {
      const order = await req.json();
      order.booking_date = `${date.getDate()}/${date.getUTCMonth()}/${date.getFullYear()}`;
      order.paid = false;
      const tran_id = Math.random().toString(36).substring(2, 15);
      // console.log(order);

      await connection.query(sqlQueries.appointments.postNew, [
        order?.patient_name,
        order?.patient_age,
        order?.patient_contact,
        order?.patient_gender,
        order?.patient_address,
        order?.doc_id,
        order?.ref_doctor,
        order?.department,
        order?.appt_type,
        order?.appt_date,
        order?.short_description,
        order?.fee,
        order?.doc_email,
        order?.appt_status,
        order?.ref_email,
        order?.paid,
        order?.payment_method,
        order?.booking_date,
        tran_id
      ]);
  
      const data = {
        total_amount: 800,
        currency: "BDT",
        tran_id: tran_id, // use unique tran_id for each api call
        success_url: `http://localhost:3000/api/payment/success/${tran_id}`,
        fail_url: `http://localhost:3000/api/payment/failed/${tran_id}`,
        cancel_url: "http://localhost:3030/cancel",
        ipn_url: "http://localhost:3030/ipn",
        shipping_method: "Courier",
        product_name: "Appointment",
        product_category: "health",
        product_profile: "general",
        cus_name: order?.patient_name,
        cus_email: order?.ref_email,
        cus_add1: "Dhaka",
        cus_add2: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: order?.patient_contact,
        cus_fax: order?.patient_contact,
        ship_name: order?.patient_name,
        ship_add1: "Dhaka",
        ship_add2: "Dhaka",
        ship_city: "Dhaka",
        ship_state: "Dhaka",
        ship_postcode: 1000,
        ship_country: "Bangladesh",
      };
  
      // console.log(data);
      
      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
      let GatewayPageURL;
      await sslcz.init(data).then((apiResponse) => {
        // Redirect the user to payment gateway
        GatewayPageURL = apiResponse.GatewayPageURL;
      });
      // console.log("Redirecting to:", GatewayPageURL);
      
      return NextResponse.json({ url: GatewayPageURL , status:201});
    } catch (error) {
      console.log(error.message);
      // NextResponse.json({ message: error.message }, { status: 500 });
    }
  }