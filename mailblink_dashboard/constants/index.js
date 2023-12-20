  // Regex for email validation
  export const emailRegex = {
    pattern:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  };

  // Regex for password validation
  export const passwordRegex = {
    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  };

  // input details for change-password page
  export const changePasswordInput = [
    {
      id: "email",
      label: "Email",
      placeholder: "enter email",
    },
    {
      id: "newPassword",
      label: "New password",
      placeholder: "enter new password"
    },
    {
      id: "confirmPassword",
      label: "Confirm password",
      placeholder: "re-enter password"
    },
  ];

  export const passwordInputs = [
    {
      id: "newPassword",
      label: "New password",
    },
    {
      id: "confirmPassword",
      label: "Confirm password",
    },
  ];

  // notification page
  export const webNotifications = [
    {
        id: "new-subscriber",
        label: "New subscriber"
    },
    {
        id: "post-like",
        label: "Post like"
    },
    {
        id: "you-followed",
        label: "Someone you followed posted"
    },
    {
        id: "campaign-sent",
        label: "Campaigns sent out"
    },
    {
        id: "campaign-delivered",
        label: " Campaign delivery"
    },
]

export const mailNotifications = [
    {
        title: "Weekly newsletter",
        label: "A small text about what the newsletters might contain"
    },
    {
        title: "Account summary",
        label: "A small text about what the newsletters might contain"
    },
]
