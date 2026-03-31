import connectDb from "@/lib/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendMail } from "@/lib/sendMail";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    await connectDb();

    let existingUser = await User.findOne({ email });

    if (existingUser && existingUser.isEmailVerified) {
      return NextResponse.json(
        { message: "User already exists with this email" },
        { status: 400 },
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ EXISTING USER (not verified)
    if (existingUser && !existingUser.isEmailVerified) {
      existingUser.name = name;
      existingUser.password = hashedPassword;
      existingUser.email = email;
      existingUser.otp = otp;
      existingUser.otpExpiresAt = otpExpiresAt;

      await existingUser.save();

      console.log("🚀 Sending email (existing user)");

      await sendMail(
        email,
        "Verify your email",
        `Your OTP for email verification is ${otp}. It expires in 10 minutes.`
      );

      return NextResponse.json(
        {
          message: "User updated successfully. Please verify your email.",
          user: existingUser,
        },
        { status: 200 },
      );
    }

    // ✅ NEW USER
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiresAt,
    });

    console.log("🚀 Sending email (new user)");

    await sendMail(
      email,
      "Verify your email",
      `Your OTP for email verification is ${otp}. It expires in 10 minutes.`
    );

    return NextResponse.json(
      {
        message: "User created successfully",
        user: newUser,
      },
      { status: 201 },
    );

  } catch (error: any) {
    return NextResponse.json(
      { message: `Register error: ${error.message}` },
      { status: 500 },
    );
  }
}