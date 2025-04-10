"use client";

import { authService } from "@/app/services";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

const VerifyEmailPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const userId = searchParams.get("userId") || "";
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const expiryParam = searchParams.get("verificationCodeExpiry");

    let expiryTime: number;
    if (expiryParam) {
      expiryTime = new Date(expiryParam).getTime();
    } else {
      // fallback: 10 mins from now
      expiryTime = Date.now() + 10 * 60 * 1000;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const secondsLeft = Math.max(0, Math.floor((expiryTime - now) / 1000));
      setTimeLeft(secondsLeft);

      if (secondsLeft === 0) {
        clearInterval(interval);
        setError("Verification code has expired.");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [searchParams]);

  const handleVerify = async () => {
    setIsVerifying(true);
    setError(null);

    try {
      await authService.verifyEmail(userId, verificationCode);
      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || "Verification failed.");
    } finally {
      setIsVerifying(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6 p-6 border rounded-xl shadow-lg bg-white">
      <h1 className="text-xl font-bold text-center">Verify Your Email</h1>

      {timeLeft !== null && !success && (
        <p className="text-sm text-gray-500 text-center">
          Code expires in:{" "}
          <span className="font-semibold text-black">
            {formatTime(timeLeft)}
          </span>
        </p>
      )}

      <input
        type="text"
        placeholder="Enter verification code"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple focus:outline-none"
        disabled={success || timeLeft === 0}
      />

      {error && <p className="text-danger text-sm text-center">{error}</p>}

      {success ? (
        <p className="text-success text-sm text-center">
          Email verified!{" "}
          <span
            onClick={() => router.push("/login")}
            className="underline text-purple-600 cursor-pointer"
          >
            Click here to login.
          </span>
        </p>
      ) : (
        <Button
          onClick={handleVerify}
          disabled={isVerifying || !verificationCode || timeLeft === 0}
          className="w-full"
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </Button>
      )}
    </div>
  );
};

export default VerifyEmailPage;
