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
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-lg border-slate-200 bg-white">
        <CardHeader className="space-y-6 pb-6 text-center">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="w-28 h-28 bg-white rounded-full shadow-md flex items-center justify-center border border-slate-100">
              <Image
                src="/orthosquare-logo.png"
                width={90}
                height={45}
                alt="OrthoSquare Logo"
                className="object-contain"
              />
            </div>
          </div>

          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold text-slate-900">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-slate-600">
              Sign in to access your OrthoSquare account
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Error Alert */}
            {loginError && (
              <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{loginError}</p>
              </div>
            )}

            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-slate-700">
                Username
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <User size={18} />
                </div>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  className={`pl-10 h-11 border-slate-300 focus:border-[#0f7396] focus:ring-2 focus:ring-[#0f7396]/20 ${
                    errors.UserId ? "border-red-300" : ""
                  }`}
                  value={form.UserId}
                  onChange={(e) => handleInputChange("UserId", e.target.value)}
                  disabled={isPending}
                />
              </div>
              {errors.UserId && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.UserId}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                Password
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock size={18} />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`pl-10 pr-10 h-11 border-slate-300 focus:border-[#0f7396] focus:ring-2 focus:ring-[#0f7396]/20 ${
                    errors.UserPassword ? "border-red-300" : ""
                  }`}
                  value={form.UserPassword}
                  onChange={(e) => handleInputChange("UserPassword", e.target.value)}
                  disabled={isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  disabled={isPending}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.UserPassword && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.UserPassword}
                </p>
              )}
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              variant="ghost"
              className="w-full h-11 !bg-[#0f7396] hover:!bg-[#0d6582] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all mt-2"
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <Spinner />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="pt-4 text-center border-t border-slate-100">
            <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
              <Lock size={14} className="text-[#0f7396]" />
              Secure healthcare management platform
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
