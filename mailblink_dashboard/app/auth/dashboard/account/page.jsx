"use client";
import HyberLink from "./HyberLink";
import { useState, useEffect } from "react";
import Link from "next/link";

// Functional component for the Account settings
const Account = () => {
  // State to manage user data
  const [values, setValues] = useState({
    email: "emailhere@gmail.com",
    currentPassword: "",
    newPassword: "",
  });

  // Initial password for validation testing
  const password = "Ebube5$";

  // State to manage updated user data
  const [updatedValues, setUpdatedValues] = useState({ ...values });

  // State for managing validation errors
  const [error, setError] = useState({});

  // Function to handle input changes
  const handleInput = (e, value) => {
    setUpdatedValues((prev) => ({ ...prev, [value]: e.target.value }));
  };

  // Validation messages object
  const validationMsg = {};

  // Function to handle email and password edits
  const handleEdit = () => {
    if (isEditable) {
      // Validation for email
      if (!updatedValues.email.trim()) {
        validationMsg.email = "Email is required";
      } else if (!emailInput.pattern.test(updatedValues.email)) {
        validationMsg.email = "Email not valid";
      } else {
        // Update the original values with the edited values
        setValues((prev) => ({ ...prev, email: updatedValues.email }));
        setEditable(false);
      }
      setError(validationMsg);
    } else {
      // Enable the edit mode
      setEditable(true);

      // Copy the existing values to a new object for editing
      const editableValues = { ...values };

      // Set the copied values to the state for editing
      setUpdatedValues(editableValues);
    }
  };

  // Function to update the password and handle validations
  const updatePassword = () => {
    // Validation for new password
    if (!updatedValues.newPassword.trim()) {
      validationMsg.newPassword = "Password is required";
    } else if (!passwordInputs[0].pattern.test(updatedValues.newPassword)) {
      validationMsg.newPassword =
        "Password should be at least 8 characters and contain at least one number and a special character";
    }

    // Validation for current password
    if (!values.currentPassword.trim()) {
      validationMsg.currentPassword = "Current password is required";
    } else if (passwordInputs[1].pattern !== values.currentPassword) {
      validationMsg.currentPassword = "Invalid password";
    }

    // Set validation errors
    setError(validationMsg);

    // Update password and clear input areas when no errors are found
    if (Object.keys(validationMsg).length === 0) {
      setValues((prev) => ({
        ...prev,
        currentPassword: updatedValues.newPassword,
      }));
      setValues((prevs) => ({ ...prevs, currentPassword: "" }));
      setUpdatedValues((prevs) => ({ ...prevs, newPassword: "" }));
    }
  };

  // useEffect to log the current password after 3 seconds
  useEffect(() => {
    if (values.currentPassword.length !== 0) {
      setTimeout(() => {
        console.log(values.currentPassword);
      }, 3000);
    }
  }, [values.currentPassword]);

  // State to toggle email address edit mode
  const [isEditable, setEditable] = useState(false);

  // State to toggle password visibility
  const [passwordShow, setPasswordShow] = useState(false);

  // Array for handling password input properties
  const passwordInputs = [
    {
      id: "newPassword",
      label: "New password",
      value: updatedValues.newPassword,
      onChange: (e) => handleInput(e, "newPassword"),
      pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    },
    {
      id: "currentPassword",
      label: "Current password",
      value: values.currentPassword,
      onChange: (e) =>
        setValues((prev) => ({ ...prev, currentPassword: e.target.value })),
      pattern: password,
    },
  ];

  // Email input validation pattern
  const emailInput = {
    pattern:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  };

  const h3Style = "font-bold text-xl mb-5";

  return (
    <main className="text-base flex">
      <div className="md:p-20 px-12 py-20 md:w-[65%] w-[100%] m-auto">
        <h2 className="font-bold text-3xl">Account Settings</h2>
        
        {/* Email address */}
        <div className="mt-8">
          <h3 className={h3Style}>Email Address</h3>
          <div className=" flex items-center justify-between">
            
            {/* Toggle edit mode */}
            {isEditable ? (
              <div className="flex flex-col gap-2 w-[80%]">
                Your email address is{" "}
                <input
                  type="text"
                  value={updatedValues.email}
                  onChange={(e) => handleInput(e, "email")}
                  className="border border-gray-400 px-2 py-3 rounded-md font-normal "
                />
                <small
                  className={`transition-all text-red-600 ${
                    error.email ? "opacity-100" : "opacity-0"
                  }`}>
                  {error.email}
                </small>
              </div>
            ) : (
              <p>
                Your email address is{" "}
                <span className="font-bold text-lg">{values.email}</span>
              </p>
            )}
            <HyberLink
              text={isEditable ? "Save" : "Change"}
              onClick={handleEdit}
            />
          </div>
        </div>

        {/* Password  */}
        <div className="mt-20">
          <div className=" flex justify-between items-center">
            <h3 className={h3Style}>Password</h3>
            <HyberLink
              text={passwordShow ? "Hide" : "show"}
              onClick={() => setPasswordShow(!passwordShow)}
            />
          </div>
          <div className="flex gap-8">
            {passwordInputs.map((input) => (
              <div key={input.id} className="flex flex-col w-[50%]">
                <label htmlFor={input.id} className=" font-bold mb-2">
                  {input.label}
                </label>
                <input
                    type={passwordShow ? "text" : "password"}
                    id={input.id}
                    value={input.value}
                    onChange={input.onChange}
                    className="border border-gray-400 px-2 py-3 rounded-md font-normal"
                  />
                  <small
                    className={`transition-all text-red-600 ${
                      error[input.id] ? "opacity-100" : "opacity-0"
                    }`}>
                    {error[input.id]}
                  </small>
              </div>
            ))}
          </div>
          <p className="mb-8 mt-4">
              Can't remember your current password?{" "}
              <Link href="/">
                <HyberLink text="Reset your password" />
              </Link>
            </p>
            <button
              onClick={updatePassword}
              className=" bg-blue-950 py-3 px-5 rounded-lg text-white">
              Save Password
            </button>
        </div>

        {/* Delete account */}
        <div className="mt-20">
          <h3 className={h3Style}>Delete account</h3>
          <p className="mb-10">Would you like to delete your account? <br/> 
          This account contains 13388 posts. Deleting your account will remove all the conntent associated with it</p>
          <HyberLink  text="I want to delete my account" color="red-500"/>
        </div>
      </div>
    </main>
  );
};

export default Account;
