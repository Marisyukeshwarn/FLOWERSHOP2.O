"use client";

import React, { useState, Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useAuth } from "@/lib/store";
import { Button } from "@/components/ui/Button";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/dashboard";
  const { state, dispatch } = useAuth();
  const { data: session, status } = useSession();
  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Sync NextAuth session with Zustand store
  useEffect(() => {
    if (status === "authenticated" && session?.user && !state.isAuthenticated) {
      dispatch({
        type: "LOGIN",
        payload: {
          id: (session.user as any).id || "google_user",
          name: session.user.name || "Google User",
          email: session.user.email || "",
          role: "customer",
          phone: "",
          rewardPoints: 0,
        },
      });
      router.push(redirectPath);
    }
  }, [status, session, dispatch, state.isAuthenticated, router, redirectPath]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate authentication
    dispatch({
      type: "LOGIN",
      payload: {
        id: "usr_123",
        name: isLogin ? (formData.email.split("@")[0] || "User") : formData.name,
        email: formData.email,
        role: "customer",
        phone: "",
        rewardPoints: 0,
      },
    });
    
    router.push(redirectPath);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FEF0F3] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-50" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#93A186]/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 opacity-50" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="font-serif text-3xl font-bold tracking-tight text-[#1A1A2E]">
              MAHALAKSHMI
              <span className="block text-xs font-sans tracking-[0.2em] text-[#93A186] uppercase mt-1">
                Bloom Studio
              </span>
            </span>
          </Link>
          <h2 className="mt-8 text-2xl font-bold text-gray-900 font-serif">
            {isLogin ? "Welcome back" : "Create an account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Enter your details to access your account." : "Join MAHALAKSHMI to track orders and save your wishlists."}
          </p>
        </div>

        <motion.div 
          className="bg-white py-8 px-4 shadow-xl shadow-[#EB7297]/5 border border-gray-100 sm:rounded-3xl sm:px-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="mt-1 relative rounded-xl shadow-sm">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={!isLogin}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-[#EB7297] focus:border-[#EB7297] transition-colors bg-gray-50/50 focus:bg-white"
                    placeholder="John Doe"
                  />
                </div>
              </motion.div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-[#EB7297] focus:border-[#EB7297] transition-colors bg-gray-50/50 focus:bg-white"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-[#EB7297] focus:border-[#EB7297] transition-colors bg-gray-50/50 focus:bg-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#EB7297] focus:ring-[#EB7297] border-gray-300 rounded cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 cursor-pointer">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-[#EB7297] hover:text-[#d4607f]">
                    Forgot password?
                  </a>
                </div>
              </div>
            )}

            <div>
              <Button type="submit" className="w-full justify-center shadow-lg shadow-[#EB7297]/20">
                {isLogin ? "Sign in" : "Create Account"} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button 
                type="button"
                onClick={() => signIn("google", { callbackUrl: redirectPath })}
                className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  <path fill="none" d="M1 1h22v22H1z" />
                </svg>
              </button>
              <button className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-[#EB7297] hover:text-[#d4607f]"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]"><div className="w-10 h-10 border-4 border-[#FEF0F3] border-t-[#EB7297] rounded-full animate-spin" /></div>}>
      <LoginContent />
    </Suspense>
  );
}
