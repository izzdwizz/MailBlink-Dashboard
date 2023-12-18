"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner";
// import { useRouter } from "next/router"; // Import useRouter from Next.js

const Signup = () => {
  // Access routing functionality
  const router = useRouter();
  // Initialize Supabase client
  const supabase = createClientComponentClient();

  // State to manage form inputs and their validation statuses
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false)
  
  // Function to handle input changes
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Function to validate form inputs
  const validateForm = () => {
    const errors = {};

    // Validate username
    if (!email.trim()) {
      errors.email = "email is required";
    }

    // Validate password
    if (!password.trim()) {
      errors.password = "Password is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Function to handle form submission
 const handleSubmit = async (event) => {
  event.preventDefault();

  // Validate form and check if it's valid
  const isValid = validateForm();
  if (!isValid) {
    return; // Don't proceed if validation fails
  }

  // Set loading state and start signup process
  setLoading(true);

  try {
    // Attempt signup using Supabase
    const { data:{ user }, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    // Update loading state and handle response
    setLoading(false);
    if (error) {
      alert("Supabase error: " + error.message);
    } else {
      if (user.identities.length === 0) {
        // User already exists with this email
        alert("A user with this email already exists");
      } else {
        // Successful signup with no existing user
        router.push("/"); // Redirect page to home page
        console.log(user); // Log user data for debug
        alert(
          "A confirmation link has been sent to your email, Verify your account to continue"
        );
      }
    }
  } catch (error) {
    // Handle unexpected errors
    alert("catch error: " + error.message);
  }
};

  return (
    <div>
      {/* spinner displays loading animation when loading is true */}
      {loading && <Spinner/>}

      {/* Signup form */}
      <div className="lg:flex">
        <div
          className="lg:w-[720px] h-[100vh] lg:ps-[247px] lg:pr-[109px] xs:ps-[10px] pt-[160px]"
          style={{
            background: `linear-gradient(141deg, #F5F0FF 0%, #EFF6FE 50.36%, #EDFAF5 100%)`,
          }}>
          <h1 className="text-[#17181A] text-[48px] font-[700] leading-[64px] font-Poppins">
            MailBlink
          </h1>
          <h3 className="text-[#17181A] text-[32px] font-[700] leading-[40px] font-Poppins mt-[15px] flex">
            We are mailblink <br /> So are you.{" "}
            <Image
              src="/assets/images/Group 2942.svg"
              width="40"
              height="39"
              className="mt-[-5rem]"
            />
          </h3>
          <p className="text-[#17181A] text-[16px] font-[400] leading-[28px] font-Poppins mt-[24px]">
            Join to improve your job search, yourself, and{" "}
            <br className="md:hidden" /> more. Get started by creating{" "}
            <br className="lg:hidden xs:hidden md:block" /> a free account!
          </p>
          <p className="text-[#17181A] text-[16px] font-[400] leading-[28px] font-Poppins mt-[5px]">
            We’re creating a service that puts you front{" "}
            <br className="md:hidden" /> and center in your career.
          </p>
        </div>
        <div className="lg:w-[720px] h-[100vh] bg-[#fff] lg:ps-[109px] lg:pt-[160px] xs:pt-[100px] xs:ps-[10px] xs:px-[0.85rem] md:px-[0.85rem]">
          <h3 className="text-[#17181A] text-[24px] font-[600] leading-[32px] font-Poppins ms-[1rem]">
            Create a personal account
          </h3>
          <form className="mt-[16px]" onSubmit={handleSubmit}>
            <label className="text-[#515458] text-[12px] font-[500] font-Poppins mt-[22px]">
              email
            </label>
            <br />
            <input
              type="text"
              placeholder="enter user name"
              className="text-[#575757] bg-[#fff] border-[#B7BFC7] border-[1px] border-solid rounded-[8px] text-[16px] font-[400] leading-[24px] font-Poppins mt-[4px] outline-none lg:w-[364px] xs:w-[100%] md:w-[600px]"
              style={{ padding: "12px 0px 12px 12px", height: "48px" }}
              value={email}
              onChange={handleEmailChange}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}{" "}
            {/* Display error message */}
            <br />
            <br />
            <label className="text-[#515458] text-[12px] font-[500] font-Poppins">
              password
            </label>{" "}
            <br />
            <input
              type="password"
              placeholder="enter password"
              className="text-[#575757] bg-[#fff] border-[#B7BFC7] border-[1px] border-solid rounded-[8px] text-[16px] font-[400] leading-[24px] font-Poppins mt-[4px] outline-none lg:w-[364px] xs:w-[100%] md:w-[600px]"
              style={{ padding: "12px 0px 12px 12px", height: "48px" }}
              value={password}
              onChange={handlePasswordChange}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}{" "}
            {/* Display error message */}
            <br />
            <button
              type="submit"
              style={{
                background: `rgba(0, 112, 240, 0.90)`,
                border: `1px solid rgba(0, 112, 240, 0.90))`,
                borderRadius: "30px",
                padding: "12px 24px",
              }}
              className="text-[16px] font-[600] leading-[24px] flex justify-center items-center font-Poppins text-[#fff] mt-[24px] lg:w-[364px] xs:w-[100%] md:w-[600px]">
              Sign up
            </button>
            <br />
            <div className="lg:ms-[-12rem] xs:ms-[-1rem] md:ms-[-4rem]">
              <p className="text-[#575757] text-center text-[14px] font-Poppins font-[400] leading-[18px] mt-[3px]">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-[#1F284F] font-[600]">
                  Log in
                </Link>{" "}
              </p>
              <p className="text-[#515458] text-center text-[12px] font-Poppins font-[400] leading-[18px] mt-[7px]">
                By signing up, you agree to MailBlink’s <br />{" "}
                <Link href="#" className="font-[500] underline">
                  Terms and Conditions.
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
