export const postProviderDetail = async (data) => {
  const response = await fetch('http://localhost:3000/api/provider/signup', {
    method: "POST",
    body: data,
    credentials: "include"
  })
  return response.json();
}
export const postLoin = async (userName, password) => {
  const response = await fetch('http://localhost:3000/api/provider/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName, password }),
    credentials: "include"
  })
  return response.json();
}
export const postislogged = async () => {
  const response = await fetch('http://localhost:3000/api/provider/islogged', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
    credentials: "include"
  })
  return response.json();
}
export const logOut = async () => {
  const response = await fetch('http://localhost:3000/api/provider/logout', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
    credentials: "include"
  })
  return response.json();
}
export const otpVerification = async (otp) => {
  const response = await fetch('http://localhost:3000/api/provider/otpverification', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ otp }),
    credentials: "include"
  })
  return response.json();
}
export const completedWork = async () => {
  const response = await fetch('http://localhost:3000/api/provider/complete', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
    credentials: "include"
  })
  return response.json();
}
export const previousClient = async (id) => {
  const response = await fetch('http://localhost:3000/api/provider/previousClient', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
    credentials: "include"
  })
  return response.json();
}
