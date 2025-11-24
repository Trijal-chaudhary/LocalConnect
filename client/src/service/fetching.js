
export const providerDetails = async (pin) => {
  const response = await fetch('http://localhost:3000/api/client/providerDetails', {
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
  const response = await fetch('http://localhost:3000/api/admin/ProviderDetails', {
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
  const response = await fetch('http://localhost:3000/api/client/signup', {
    method: "POST",
    body: data,
    credentials: "include"
  })
  return response.json();
}
export const postLoginClient = async (userName, password) => {
  const response = await fetch('http://localhost:3000/api/client/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName, password }),
    credentials: "include"
  })
  return response.json();
}
export const postVerifingOtp = async (otp, details) => {
  const response = await fetch('http://localhost:3000/api/client/verification', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ otp, details }),
    credentials: "include"
  })
  return response.json();
}
export const isLoggedClient = async () => {
  const response = await fetch('http://localhost:3000/api/client/isLogged', {
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
  const response = await fetch('http://localhost:3000/api/client/logout', {
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
  const response = await fetch('http://localhost:3000/api/client/book', {
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
  const response = await fetch('http://localhost:3000/api/client/completed', {
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
  const response = await fetch('http://localhost:3000/api/client/previousProvider', {
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
  const response = await fetch('http://localhost:3000/api/client/review', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ star, review, provider }),
    credentials: "include"
  })

}
export const postSearch = async (search) => {
  const response = await fetch('http://localhost:3000/api/client/search', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ search }),
    credentials: "include"
  })
  return response.json()
}