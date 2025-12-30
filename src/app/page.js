"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Eye, EyeOff, Lock, User, AlertCircle } from "lucide-react";
import { useLogin } from "@/api/client/auth";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/authSlice";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    UserId: "",
    UserPassword: ""
  });
  const [errors, setErrors] = useState({ UserId: "", UserPassword: "" });
  const [loginError, setLoginError] = useState("");
  const { mutate: login, isPending } = useLogin();
  const dispatch = useDispatch();
  const router = useRouter();

  const validateForm = () => {
    const newErrors = { UserId: "", UserPassword: "" };
    let isValid = true;

    if (!form.UserId.trim()) {
      newErrors.UserId = "Username is required";
      isValid = false;
    }

    if (!form.UserPassword) {
      newErrors.UserPassword = "Password is required";
      isValid = false;
    } else if (form.UserPassword.length < 4) {
      newErrors.UserPassword = "Password must be at least 4 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setLoginError("");

    if (!validateForm()) {
      return;
    }

    login(form, {
      onSuccess: (res) => {
        dispatch(setCredentials({ token: res.token, user: res.userId, userData: res }));
        if (res.roleName === "1") {
          router.push("/dashboard/clinic");
        } else {
          router.push("/dashboard/admin");
        }
      },
      onError: (err) => {
        setLoginError(err.response?.data?.message || "Login failed. Please check your credentials.");
      },
    });
  };

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
    if (loginError) {
      setLoginError("");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#f0fdfa] via-white to-[#f0f9ff] p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#0f7396]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#14b8a6]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#0f7396]/3 to-[#14b8a6]/3 rounded-full blur-3xl"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 border border-slate-100 shadow-2xl shadow-slate-300/50 bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden">
        {/* Decorative Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0f7396] via-[#14b8a6] to-[#0f7396]"></div>

        <CardHeader className="space-y-6 pb-6 pt-10 px-8 text-center">
          {/* Logo with Background Circle */}
          <div className="flex justify-center">
            <div className="relative w-36 h-36">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0f7396]/10 to-[#14b8a6]/10 rounded-full blur-xl"></div>
              <div className="relative bg-white rounded-full p-6 shadow-lg w-full h-full flex items-center justify-center">
                <Image
                  src="/orthosquare-logo.png"
                  width={100}
                  height={50}
                  alt="OrthoSquare Logo"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-[#0f7396] to-[#14b8a6] bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-base text-slate-600">
              Sign in to access your OrthoSquare account
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 px-8 pb-8">
          <form onSubmit={handleSignIn} className="space-y-5">
            {/* Error Alert */}
            {loginError && (
              <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-red-50 to-red-50/50 border border-red-200 rounded-2xl text-red-700 animate-in slide-in-from-top-2 duration-300 shadow-sm">
                <div className="mt-0.5 p-1 bg-red-100 rounded-full">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                </div>
                <p className="text-sm leading-relaxed">{loginError}</p>
              </div>
            )}

            {/* Username Field */}
            <div className="space-y-2.5">
              <Label htmlFor="username" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <User size={16} className="text-[#0f7396]" />
                Username
              </Label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0f7396] transition-all duration-300">
                  <User size={20} />
                </div>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  className={`pl-12 h-13 rounded-xl border-2 border-slate-200 bg-white hover:border-slate-300 focus:border-[#0f7396] focus:ring-4 focus:ring-[#0f7396]/10 transition-all duration-300 text-base shadow-sm ${
                    errors.UserId ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : ""
                  }`}
                  value={form.UserId}
                  onChange={(e) => handleInputChange("UserId", e.target.value)}
                  disabled={isPending}
                />
              </div>
              {errors.UserId && (
                <p className="text-sm text-red-600 flex items-center gap-1.5 animate-in slide-in-from-top-1 duration-200">
                  <AlertCircle size={14} />
                  {errors.UserId}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2.5">
              <Label htmlFor="password" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Lock size={16} className="text-[#0f7396]" />
                Password
              </Label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0f7396] transition-all duration-300">
                  <Lock size={20} />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`pl-12 pr-12 h-13 rounded-xl border-2 border-slate-200 bg-white hover:border-slate-300 focus:border-[#0f7396] focus:ring-4 focus:ring-[#0f7396]/10 transition-all duration-300 text-base shadow-sm ${
                    errors.UserPassword ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : ""
                  }`}
                  value={form.UserPassword}
                  onChange={(e) => handleInputChange("UserPassword", e.target.value)}
                  disabled={isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0f7396] transition-all duration-300 focus:outline-none focus:text-[#0f7396] p-1 rounded-lg hover:bg-slate-100"
                  disabled={isPending}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.UserPassword && (
                <p className="text-sm text-red-600 flex items-center gap-1.5 animate-in slide-in-from-top-1 duration-200">
                  <AlertCircle size={14} />
                  {errors.UserPassword}
                </p>
              )}
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              variant="ghost"
              className="w-full h-13 !bg-gradient-to-r from-[#0f7396] to-[#0d6582] hover:from-[#0d6582] hover:to-[#0f7396] text-white font-semibold rounded-xl shadow-lg shadow-[#0f7396]/30 hover:shadow-xl hover:shadow-[#0f7396]/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-6"
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <Spinner />
                  <span>Signing in...</span>
                </div>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="pt-6 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500 bg-gradient-to-r from-slate-50 to-white rounded-lg py-3 px-4 border border-slate-100">
              <Lock size={16} className="text-[#14b8a6]" />
              <span>Secure healthcare management platform</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
