"use client"

import { useState } from "react";
import { emailRegex } from "@/constants";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const Reset = () => {
    // Access routing functionality
  const router = useRouter();
  // Initialize Supabase client
  const supabase = createClientComponentClient();

  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  let validationMsg = {};

  // Function to handle email edits button
  const handleReset = async () => {
      // Validation for email
      if (!email.trim()) {
        validationMsg.email = "Email is required";
      } else if (!emailRegex.pattern.test(email)) {
        validationMsg.email = "Email not valid"; 
    } else {
        try {
            
        } catch (error) {
            console.log("server error: ", error.message)
        }
        const { data, error } = await supabase.auth.resetPasswordForEmail(email) 
        if(error) {
            alert(error.message)
        } else {
            alert ("A reset password link has been sent to your email")
            console.log(data)
        }
    }
      setError(validationMsg);
  };

  return (
    <main className="max-width w-full h-screen flex-center flex-col ">
        <h2 className="font-bold text-xl mb-10">Reset Password</h2>
        <form className="flex flex-col md:w-1/2 w-3/4">
          <label htmlFor="reset" className="text-base">
            Enter the email address linked to your account
          </label>
          <input
            type="text"
            id="reset"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-black text-lg px-2 py-3 rounded-md "
          />
          <small
            className={`-mt-4 transition-all text-red-600 ${
              error.email ? "opacity-100" : "opacity-0"
            }`}>
            {error.email}
          </small>
        </form>
      <button
        onClick={handleReset}
        className="border custom-btn md:w-1/2 w-3/4 mt-10">
        Reset Password
      </button>
    </main>
  );
};

export default Reset;
