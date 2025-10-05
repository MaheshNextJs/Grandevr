// app/pre-check-in/id-verification/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const steps = [
  "Reservation Login",
  "ID Verification",
  "Preferences",
  "Add-On Payment",
  "Digital Signature",
  "Confirmation",
];

type Status = "idle" | "uploading" | "verifying" | "verified";

export default function IdVerificationPage() {
  const router = useRouter();
  const [currentStep] = useState(2);

  // stepper rail sizing
  const railRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLDivElement>(null);
  const lastRef = useRef<HTMLDivElement>(null);
  const [railStyle, setRailStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  useEffect(() => {
    const calc = () => {
      if (!railRef.current || !firstRef.current || !lastRef.current) return;
      const railBox = railRef.current.getBoundingClientRect();
      const firstBox = firstRef.current.getBoundingClientRect();
      const lastBox = lastRef.current.getBoundingClientRect();
      const firstCenter = firstBox.left + firstBox.width / 2;
      const lastCenter = lastBox.left + lastBox.width / 2;
      setRailStyle({
        left: firstCenter - railBox.left,
        width: Math.max(0, lastCenter - firstCenter),
      });
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // upload state
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [dragOver, setDragOver] = useState(false);

  // simulate upload + verify
  useEffect(() => {
    if (status !== "uploading") return;
    setProgress(0);
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          setStatus("verifying");
          setTimeout(() => setStatus("verified"), 1200);
          return 100;
        }
        return p + 3; // speed
      });
    }, 40);
    return () => clearInterval(id);
  }, [status]);

  const onFiles = (f: FileList | null) => {
    const picked = f && f[0];
    if (!picked) return;
    setFile(picked);
    setStatus("uploading");
  };

  const removeFile = () => {
    setFile(null);
    setProgress(0);
    setStatus("idle");
  };

  return (
    <section className="px-6 py-25 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto">
        {/* ===== Stepper ===== */}
        <div className="mb-10 relative" ref={railRef}>
          <div
            className="absolute top-6 h-[2px] bg-gray-200 z-0"
            style={{ left: railStyle.left, width: railStyle.width }}
          />
          <div
            className="absolute top-6 h-[2px] bg-[#A57865] z-0"
            style={{
              left: railStyle.left,
              width:
                railStyle.width *
                (Math.max(0, currentStep - 1) / (steps.length - 1)),
            }}
          />
          <div className="flex justify-between items-center relative z-10">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;
              return (
                <div
                  key={step}
                  className="flex flex-col items-center gap-2"
                  ref={
                    index === 0
                      ? firstRef
                      : index === steps.length - 1
                      ? lastRef
                      : undefined
                  }
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm
                    ${
                      isCompleted
                        ? "bg-[#A57865] text-white"
                        : isCurrent
                        ? "bg-white border-2 border-[#A57865] text-[#A57865]"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {isCompleted ? "✓" : stepNumber}
                  </div>
                  <span
                    className={`text-sm ${
                      isCurrent ? "text-[#A57865]" : "text-gray-500"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== Header ===== */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Document Verification</h1>
          <p className="text-sm text-gray-600 mt-2">
            Upload your identification document for verification
          </p>
        </div>

        {/* ===== Dropzone ===== */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            onFiles(e.dataTransfer.files);
          }}
          className={`rounded-lg border-2 border-dashed p-10 mb-4 transition-colors ${
            dragOver ? "border-[#A57865] bg-[#faf5f3]" : "border-gray-300"
          }`}
        >
          <label className="w-full h-full flex flex-col items-center justify-center gap-2 cursor-pointer">
            <svg
              className="w-7 h-7 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 16V4m0 0L8 8m4-4 4 4" />
              <path d="M20 16.5V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2.5" />
            </svg>
            <span className="text-sm text-gray-600">
              Click or drag file to this area to upload
            </span>
            <span className="text-xs text-gray-400">
              Upload your identification document for verification
            </span>
            <input
              type="file"
              onChange={(e) => onFiles(e.target.files)}
              className="hidden"
              accept=".pdf,.png,.jpg,.jpeg"
            />
          </label>
        </div>

        {/* ===== File Row & Progress ===== */}
        {file && (
          <div className="border rounded-md shadow-sm p-3 flex items-start gap-3 mb-4">
            {/* fake filetype icon */}
            <div className="w-8 h-8 rounded bg-red-100 flex items-center justify-center text-[10px] font-bold text-red-600">
              PDF
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium truncate">{file.name}</span>
                <button
                  onClick={removeFile}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Remove file"
                >
                  ✕
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {Math.min(60, Math.round((progress / 100) * 120))} KB of 120 KB
                • {status === "uploading" ? "Uploading..." : "Uploaded"}
              </p>
              <div className="h-1.5 bg-gray-200 rounded mt-2 overflow-hidden">
                <div
                  className="h-full bg-[#3b82f6] transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ===== Verifying / Verified ===== */}
        {status === "verifying" && (
          <div className="border border-amber-300 bg-amber-50 text-amber-800 rounded-md px-4 py-3 mb-3 text-sm flex items-center gap-2">
            <svg
              className="w-4 h-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            Verifying ID…
          </div>
        )}

        {status === "verified" && (
          <div className="border border-green-300 bg-green-50 text-green-800 rounded-md px-4 py-3 mb-3 text-sm flex items-center gap-2">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            ID Verified Successfully
          </div>
        )}

        {/* ===== Continue Button ===== */}
        <div className="mt-6 flex flex-col items-center">
          <button
            type="button"
            disabled={status !== "verified"}
            onClick={() => router.push("/user/pre-check-in/preferences")}
            className={`w-full md:w-96 bg-[#A57865] text-white py-3 rounded-md text-sm transition-colors duration-300 ${
              status === "verified"
                ? "hover:bg-[#7a3c23]"
                : "opacity-60 cursor-not-allowed"
            }`}
          >
            Continue
          </button>

          <p className="text-[11px] text-gray-500 mt-4 text-center max-w-md">
            <span className="font-semibold">Secure Upload:</span> Your documents
            are encrypted and processed securely. We comply with industry
            standards for data protection.
          </p>
        </div>
      </div>
    </section>
  );
}
