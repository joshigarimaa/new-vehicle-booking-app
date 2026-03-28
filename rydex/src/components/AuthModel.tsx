"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, Mail, User, X } from "lucide-react";
import Image from "next/image";

type propType = {
  open: boolean;
  onClose: () => void;
};

type stepType = "login" | "signup" | "otp";

const AuthModel = ({ open, onClose }: propType) => {
  const [step, setStep] = useState<stepType>("login");

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
                            type="email"
                            placeholder="Email"
                            className="w-full bg-transparent outline-none text-sm focus:outline-none"
                          />
                        </div>

                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <Lock className="text-gray-500" size={18} />
                          <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-transparent outline-none text-sm focus:outline-none"
                          />
                        </div>

                        <button
                          type="button"
                          className="w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition"
                        >
                          Login
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
                            placeholder="Full Name"
                            className="w-full bg-transparent outline-none text-sm focus:outline-none"
                          />
                        </div>

                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <Mail className="text-gray-500" size={18} />
                          <input
                            type="email"
                            placeholder="Email"
                            className="w-full bg-transparent outline-none text-sm focus:outline-none"
                          />
                        </div>

                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <Lock className="text-gray-500" size={18} />
                          <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-transparent outline-none text-sm focus:outline-none"
                          />
                        </div>

                        <button
                          type="button"
                          className="w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition"
                        >
                          Sign Up
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
