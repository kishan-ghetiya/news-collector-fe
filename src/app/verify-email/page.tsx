"use client";

import { authService } from "@/app/services";
import { Input } from "@/components/input/Input";
import Button from "@/components/ui/Button";
import { getErrorMessage } from "@/types/auth";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const VerifyEmailPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const expiryParam = searchParams.get("verificationCodeExpiry");

    const expiryTime = expiryParam
      ? new Date(expiryParam).getTime()
      : Date.now() + 10 * 60 * 1000;

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
      await authService.verifyEmail(email, verificationCode);
      setSuccess(true);
    } catch (err: unknown) {
      setError(getErrorMessage(err) || "Verification failed.");
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
    <div className="mx-5">
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

        <Input
          type="text"
          name="verificationCode"
          label="Verification Code"
          value={verificationCode}
          placeholder="Enter verification code"
          onChange={(e) => setVerificationCode(e.target.value)}
          error={error || undefined}
          disbaled={Boolean(success || timeLeft === 0)}
          variant="solid"
        />

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
            loading={isVerifying}
            disabled={!verificationCode || timeLeft === 0}
            className="w-full"
          >
            Verify
          </Button>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
