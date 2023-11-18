import { NextResponse } from "next/server";
import bycrypt from "bcryptjs";
import { transporter } from "../../utils/nodemailer";
import { generateUniqueCode } from "../../utils/generateUniqueCode";

// Function to create a token with a validity of 10 minutes
function createToken() {
  const otpCode = generateUniqueCode();
  const expirationTimeMilliSec = Date.now() + 10 * 60 * 1000;

  const date = new Date(expirationTimeMilliSec);

  let hours = date.getHours();
  const minutes = date.getMinutes();

  // Convert to 12-hour format
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Adjust to 12-hour format

  // Format the time
  const formattedTime = `${hours}:${minutes} ${ampm}`;

  return {
    code: otpCode,
    expirationTimeMilliSec,
    formattedTime,
  };
}

export async function POST(req) {
  try {
    const user = await req.json();
    const token = createToken();

    // Sending a mail with token
    const mail = await transporter.sendMail({
      from: process.env.EMAIL,
      to: user?.email,
      subject: "Verify Yourself",
      html: `
        <h1>Hello ,${user?.name} cordial welcome to PHP Hospital ❤️</h1>
        <h3>Your One Time Password (OTP)</h3>
        </br>
        <h1>${token.code}</h1>
        </br>
        <p><small>Use this OTP to verify yourself in PHP Hospital Registration</small></p>
        <p><small>This OTP is valid till ${token.formattedTime}</small></p>
        <p><small>Don't share this OTP with anyone</small></p>
        <h3>Thank You!</h3>
        `,
    });

    token.code = await bycrypt.hash(token.code, 10);

    return NextResponse.json(token, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
