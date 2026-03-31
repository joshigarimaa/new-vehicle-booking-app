import connectDb from "@/lib/db";
import User from "@/models/userModel";

export async function POST(req: Request) {
  try {
    await connectDb();

    const { email, otp } = await req.json();

    if (!email || !otp) {
      return Response.json(
        { message: "Email & OTP is required" },
        { status: 400 },
      );
    }

    let user = await User.findOne({ email });

    if (!user) {
      return Response.json(
        { message: "User not found with this email" },
        { status: 404 },
      );
    }

    if (user.isEmailVerified) {
      return Response.json(
        { message: "Email is already verified" },
        { status: 400 },
      );
    }

    if (!user.otpExpiresAt || user.otpExpiresAt < new Date()) {
      return Response.json(
        { message: "OTP has expired. Please request a new one." },
        { status: 400 },
      );
    }

    if (!user.otp || user.otp !== otp) {
      return Response.json(
        { message: "Invalid OTP. Please try again." },
        { status: 400 },
      );
    }

    user.isEmailVerified = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;

    await user.save();

    return Response.json(
      { message: "Email verified successfully" },
      { status: 200 },
    );

  } catch (error: any) {
    return Response.json(
      { message: `Verification error: ${error.message}` },
      { status: 500 },
    );
  }
}