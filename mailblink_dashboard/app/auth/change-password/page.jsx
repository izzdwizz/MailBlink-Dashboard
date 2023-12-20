"use client";

import { useState } from "react";
import { changePasswordInput, emailRegex, passwordRegex } from "@/constants";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const ChangePassword = () => {
 // Access routing functionality
 const router = useRouter();
 // Initialize Supabase client
 const supabase = createClientComponentClient();

  const [values, setValues] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  let validationMsg = {};

  // Function to handle email edits button
  const handleChangePassword = async () => {
    // Validation for email and password
    if (!values.email.trim()) {
      validationMsg.email = "Email is required";
    } else if (!emailRegex.pattern.test(values.email)) {
      validationMsg.email = "Email not valid";
    }

    if (!values.newPassword.trim()) {
      validationMsg.newPassword = "Password is required";
    } else if (!passwordRegex.pattern.test(values.newPassword)) {
      validationMsg.newPassword =
        "Password should not be less than 8 characters and contain at least one number and a special character";
    }

    // Validation for confirm password
    if (!values.confirmPassword.trim()) {
      validationMsg.confirmPassword = "re-enter password";
    } else if (values.confirmPassword !== values.newPassword) {
      validationMsg.confirmPassword = "Password does not match";
    } else {
      try {
        const { data, error } = await supabase.auth.updateUser({
          password: values.newPassword,
        });
        if (error) {
          console.log("supabase error:", error.message);
        } else {
          alert(
            "Password reset succeful"
          );
            router.push('/auth/login')
          setValues((prevs) => ({
            ...prevs,
            email: "",
            newPassword: "",
            confirmPassword: "",
          }));
        }
      } catch (error) {
        console.log(error);
      }
    }
    setError(validationMsg);
  };

  return (
    <main className="max-width w-full h-screen flex-center flex-col ">
      <h2 className="font-bold text-xl mb-10">Update Password</h2>
      <form className="flex flex-col md:w-1/2 w-3/4">
        {changePasswordInput.map((item) => (
          <div key={item.id}>
            <label htmlFor={item.id} className="text-base">
              {item.label}
            </label>
            <input
              type="text"
              id={item.id}
              placeholder={item.placeholder}
              value={values[item.id]}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, [item.id]: e.target.value }))
              }
              className="text-black text-base px-2 py-3 rounded-md "
            />
            <small
              className={`-mt-4 transition-all text-red-600 ${
                error[item.id] ? "opacity-100" : "opacity-0"
              }`}>
              {error[item.id]}
            </small>
          </div>
        ))}
      </form>
      <button
        onClick={handleChangePassword}
        className="custom-btn md:w-1/2 w-3/4 mt-10">
        Reset Password
      </button>
    </main>
  );
};

export default ChangePassword;
