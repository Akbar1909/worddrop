"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Github, Facebook, Instagram } from "lucide-react";
import { useForm } from "react-hook-form";
import useAppMutation from "@/hooks/useAppMutation";
import { request } from "@/services/request";
import useGetMe from "@/hooks/endpoints/useGetMe";

type AuthMode = "login" | "register";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [mode, setMode] = useState<AuthMode>("login");

  const { register, ...formRest } = useForm();
  const { inValidateQuery } = useGetMe()

  const { mutate } = useAppMutation({
    mutationFn: (body: any) => request.post("/auth/register", body),
    mutationKey: ["auth-register"],
    onSuccess: () => {
      setMode("login");
    },
  });

  const { mutate: loginMutate } = useAppMutation({
    mutationFn: (body: any) => request.post("/auth/login", body),
    mutationKey: ["auth-register"],
    onSuccess: (res) => {
      document.cookie = `recall-token=${res.data.token}; path=/; max-age=3600`;
      inValidateQuery()
      onClose();

    },
  });

  const handleSubmit = formRest.handleSubmit((values: any) => {
    if (mode === "register") {
      mutate(values);
    } else {
      loginMutate({
        username: values.email || values?.username,
        password: values?.password,
      });
    }
  });

  const handleSocialAuth = (provider: string) => {
    console.log("Social auth with:", provider);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden"
          >
            <div className="flex justify-between items-center p-6 bg-[var(--primary-color)] text-white">
              <h2 className="text-2xl font-bold">
                {mode === "login" ? "Login" : "Register"}
              </h2>
              <button
                onClick={onClose}
                className="text-black hover:text-black/60"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {mode === "register" && (
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
                      placeholder="Username"
                      {...register("username")}
                    />
                  </div>
                </div>
              )}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
                    placeholder="Username"
                    {...register("username")}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    {...register("password")}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
                    placeholder="Password"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-color)]"
              >
                {mode === "login" ? "Sign In" : "Sign Up"}
              </button>
            </form>
            <div className="px-6 pb-6 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleSocialAuth("google")}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 col-span-2"
                >
                  <span className="sr-only">Sign in with Google</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                </button>
                {/* <button
                  onClick={() => handleSocialAuth("facebook")}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Facebook</span>
                  <Facebook className="w-5 h-5 text-blue-600" />
                </button>
                <button
                  onClick={() => handleSocialAuth("github")}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with GitHub</span>
                  <Github className="w-5 h-5 text-gray-900" />
                </button>
                <button
                  onClick={() => handleSocialAuth("instagram")}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Instagram</span>
                  <Instagram className="w-5 h-5 text-pink-600" />
                </button> */}
              </div>
            </div>
            <div className="px-6 pb-6 text-sm text-center">
              {mode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => setMode("register")}
                    className="font-medium text-[var(--primary-color)] hover:text-[var(--primary-dark)]"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setMode("login")}
                    className="font-medium text-[var(--primary-color)] hover:text-[var(--primary-dark)]"
                  >
                    Log in
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
