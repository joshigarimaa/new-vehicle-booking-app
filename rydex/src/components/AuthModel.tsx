"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleDashed, Lock, Mail, User, X } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";

type propType = {
  open: boolean;
  onClose: () => void;
};

type stepType = "login" | "signup" | "otp";

const AuthModel = ({ open, onClose }: propType) => {
  const [step, setStep] = useState<stepType>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const { data } = useSession();
  console.log(data);
  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
      }
    } catch (err: any) {
      setError("Something went wrong");
    }
    setLoading(false);
  };

  const handleOtp = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
    if (!value && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    if (!email) {
      setError("Email is required");
      setLoading(false);
      return;
    }

    try {
      console.log("Frontend email:", email); // DEBUG

      await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });

      setStep("otp");
    } catch (error: any) {
      setError(error?.response?.data?.message ?? "Something went wrong");
    }

    setLoading(false);
  };

  const verifyEmail = async () => {
    setLoading(true);
    setError("");

    try {
      await axios.post("/api/verify-email", {
        email,
        otp: otp.join(""),
      });
      setOtp(["", "", "", "", "", ""]);
      setError("");
      setStep("login");
    } catch (error: any) {
      setError(error?.response?.data?.message ?? "Something went wrong");
    }

    setLoading(false);
  };

  const handleGoogle = async () => {
    await signIn("google");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onClose}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            >
              <div className="relative w-full max-w-md rounded-3xl bg-white border border-black/10 shadow-[0_40px_100px_rgba(0,0,0,0.35)] p-6 sm:p-8 text-black">
                {/* Close Button */}
                <div
                  onClick={onClose}
                  className="absolute right-4 top-4 text-gray-500 hover:text-black transition cursor-pointer"
                >
                  <X size={20} />
                </div>

                {/* Logo */}
                <div className="mb-6 text-center">
                  <h1 className="text-3xl font-extrabold tracking-widest">
                    RYDEX
                  </h1>
                  <p className="mt-1 text-xs text-gray-500">
                    Premium Vehicle Booking
                  </p>
                </div>

                {/* Google Button */}
                <button
                  type="button"
                  className="w-full h-11 rounded-xl border border-black/20 flex items-center justify-center gap-3 text-sm font-semibold hover:bg-black hover:text-white transition"
                  onClick={handleGoogle}
                >
                  <Image
                    src="/googleImage.png"
                    alt="google"
                    width={20}
                    height={20}
                  />
                  Continue with Google
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-black/10" />
                  <div className="text-xs text-gray-500">OR</div>
                  <div className="flex-1 h-px bg-black/10" />
                </div>

                <div>
                  {step === "login" && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <h1 className="text-xl font-semibold">Welcome back</h1>

                      <div className="mt-5 space-y-4">
                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <Mail className="text-gray-500" size={18} />
                          <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            value={email}
                            placeholder="Email"
                            className="w-full bg-transparent outline-none text-sm"
                          />
                        </div>

                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <Lock className="text-gray-500" size={18} />
                          <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            value={password}
                            placeholder="Password"
                            className="w-full bg-transparent outline-none text-sm"
                          />
                        </div>

                        {error && (
                          <p className="text-red-500 text-sm">{error}</p>
                        )}

                        <button
                          type="button"
                          className="w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition flex justify-center items-center"
                          onClick={handleLogin}
                          disabled={loading}
                        >
                          {!loading ? (
                            "Login"
                          ) : (
                            <CircleDashed
                              size={18}
                              color="white"
                              className="animate-spin"
                            />
                          )}
                        </button>
                      </div>

                      <p className="mt-6 text-center text-sm text-gray-500">
                        Don't have an account?{" "}
                        <span
                          onClick={() => setStep("signup")}
                          className="text-black font-medium hover:underline cursor-pointer"
                        >
                          Sign Up
                        </span>
                      </p>
                    </motion.div>
                  )}

                  {step === "signup" && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <h1 className="text-xl font-semibold">Create Account</h1>

                      <div className="mt-5 space-y-4">
                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <User className="text-gray-500" size={18} />
                          <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="Full Name"
                            className="w-full bg-transparent outline-none text-sm"
                          />
                        </div>

                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <Mail className="text-gray-500" size={18} />
                          <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="Email"
                            className="w-full bg-transparent outline-none text-sm"
                          />
                        </div>

                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <Lock className="text-gray-500" size={18} />
                          <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Password"
                            className="w-full bg-transparent outline-none text-sm"
                          />
                        </div>

                        {error && (
                          <p className="text-red-500 text-sm">{error}</p>
                        )}

                        <button
                          type="button"
                          className="flex justify-center items-center w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition"
                          disabled={loading}
                          onClick={handleSignup}
                        >
                          {!loading ? (
                            "Send Otp"
                          ) : (
                            <CircleDashed
                              size={18}
                              color="white"
                              className="animate-spin"
                            />
                          )}
                        </button>
                      </div>

                      <p className="mt-6 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <span
                          onClick={() => setStep("login")}
                          className="text-black font-medium hover:underline cursor-pointer"
                        >
                          Login
                        </span>
                      </p>
                    </motion.div>
                  )}

                  {step === "otp" && (
                    <motion.div
                      key="otp"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-xl font-semibold">Verify Email</h2>
                      <div className="mt-6 flex justify-center gap-2">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            value={digit}
                            maxLength={1}
                            onChange={(e) => handleOtp(index, e.target.value)}
                            className="w-10 h-12 sm:w-12 text-center text-lg font-semibold bg-white border border-black/20 rounded-xl outline-none"
                          />
                        ))}
                      </div>
                      <button
                        onClick={verifyEmail}
                        disabled={loading}
                        className="mt-6 flex justify-center items-center w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition flex justify-center items-center"
                      >
                        {!loading ? "Verify and Create Account" : "Loading..."}
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModel;
