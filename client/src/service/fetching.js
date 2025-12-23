
export const providerDetails = async (pin) => {
  const response = await fetch('https://localconnect-backend-81u0.onrender.com/api/client/providerDetails', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pin }),
    credentials: "include"
  })
  return response.json();
}
export const ProviderDetailsAdmin = async (id) => {
  const response = await fetch('https://localconnect-backend-81u0.onrender.com/api/admin/ProviderDetails', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
    credentials: "include"
  });
  return response.json()
}
export const ClientSignup = async (data) => {
  const response = await fetch('https://localconnect-backend-81u0.onrender.com/api/client/signup', {
    method: "POST",
    body: data,
    credentials: "include"
  })
  return response.json();
}
export const postLoginClient = async (userName, password) => {
  const response = await fetch('https://localconnect-backend-81u0.onrender.com/api/client/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName, password }),
    credentials: "include"
  })
  return response.json();
}
export const postVerifingOtp = async (details) => {
  const response = await fetch('https://localconnect-backend-81u0.onrender.com/api/client/verification', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ details }),
    credentials: "include"
  })
  return response.json();
}
export const sendingOTPForReset = async (username) => {
  const response = await fetch('https://localconnect-backend-81u0.onrender.com/api/client/usernameReset', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
    credentials: "include"
  })
  return response.json();
}
export const OtpPasswordReset = async (otp, email) => {
  const response = await fetch('https://localconnect-backend-81u0.onrender.com/api/client/OTPReset', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ otp, email }),
    credentials: "include"
  })
  return response.json();
}
export const resetPassword = async (email, username, password) => {
  const response = await fetch('https://localconnect-backend-81u0.onrender.com/api/client/newPassword', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, username, password }),
    credentials: "include"
  })
  return response.json();
}
export const isLoggedClient = async () => {
  const response = await fetch('https://localconnect-backend-81u0.onrender.com/api/client/isLogged', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
    credentials: "include"
  })
  return response.json();
}
export const logOutClient = async () => {
  const response = await fetch('https://localconnect-backend-81u0.onrender.com/api/client/logout', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
    credentials: "include"
  })
  return response.json();
}
export const bookClient = async (id) => {
  const response = await fetch('https://localconnect-backend-81u0.onrender.com/api/client/book', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
    credentials: "include"
  });
  return response.json()
}
export const CompletedComfr = async () => {
  const response = await fetch('https://localconnect-backend-81u0.onrender.com/api/client/completed', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
    credentials: "include"
  });
  return response.json()
}
export const previousProvider = async (id) => {
  const response = await fetch('https://localconnect-backend-81u0.onrender.com/api/client/previousProvider', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
    credentials: "include"
  });
  return response.json()
}
export const postReview = async (star, review, provider) => {
  const response = await fetch('https://localconnect-backend-81u0.onrender.com/api/client/review', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ star, review, provider }),
    credentials: "include"
  })

}
export const postSearch = async (search) => {
  const response = await fetch('https://localconnect-backend-81u0.onrender.com/api/client/search', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ search }),
    credentials: "include"
  })
  return response.json()
}