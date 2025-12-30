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
      <Card className="w-full max-w-md border-0 shadow-2xl shadow-slate-200/50 bg-white">
        <CardHeader className="space-y-6 pb-8 text-center">
          <div className="flex justify-center">
            <div className="relative group">
              <Image
                src="/orthosquare-logo.png"
                width={140}
                height={70}
                alt="OrthoSquare Logo"
                className="object-contain"
              />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold text-slate-900">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-base text-slate-600">
              Sign in to access your OrthoSquare account
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSignIn} className="space-y-5">
            {/* Error Alert */}
            {loginError && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 animate-in slide-in-from-top-2 duration-300">
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{loginError}</p>
              </div>
            )}

            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-semibold text-slate-700">
                Username
              </Label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-medivardaan-blue transition-colors">
                  <User size={20} />
                </div>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  className={`pl-12 h-12 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white focus:border-medivardaan-blue focus:ring-4 focus:ring-medivardaan-blue/10 transition-all text-base ${
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
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-slate-700">
                Password
              </Label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-medivardaan-blue transition-colors">
                  <Lock size={20} />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`pl-12 pr-12 h-12 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white focus:border-medivardaan-blue focus:ring-4 focus:ring-medivardaan-blue/10 transition-all text-base ${
                    errors.UserPassword ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : ""
                  }`}
                  value={form.UserPassword}
                  onChange={(e) => handleInputChange("UserPassword", e.target.value)}
                  disabled={isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-medivardaan-blue transition-colors focus:outline-none focus:text-medivardaan-blue"
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
              className="w-full h-12 !bg-[#0f7396] hover:!bg-[#0d6582] text-white font-semibold rounded-xl shadow-lg shadow-[#0f7396]/30 hover:shadow-xl hover:shadow-[#0f7396]/40 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
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
          <div className="pt-6 text-center border-t border-slate-100">
            <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
              <Lock size={14} className="text-medivardaan-teal" />
              Secure healthcare management platform
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
