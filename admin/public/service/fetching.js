export const loginAdmin = async (username, password) => {
  const response = await fetch('http://localhost:3000/api/admin/login', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    credentials: "include"
  });
  return response.json()
}
export const isloggedAdmin = async () => {
  const response = await fetch('http://localhost:3000/api/admin/islogged', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
    credentials: "include"
  });
  return response.json()
}
export const logOutAdmin = async () => {
  const response = await fetch('http://localhost:3000/api/admin/logout', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
    credentials: "include"
  });
  return response.json()
}
export const pendingDetails = async () => {
  const response = await fetch('http://localhost:3000/api/admin/pendingDetails', {
    method: 'GET',
    credentials: "include"
  })
  return response.json()
}
export const ApprovedDetails = async () => {
  const response = await fetch('http://localhost:3000/api/admin/approvedDetails', {
    method: 'GET',
    credentials: "include"
  })
  return response.json()
}
export const RejectedDetails = async () => {
  const response = await fetch('http://localhost:3000/api/admin/rejectedDetails', {
    method: 'GET',
    credentials: "include"
  })
  return response.json()
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
export const reject = async (id) => {
  const response = await fetch('http://localhost:3000/api/admin/rejected', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
    credentials: "include"
  });
  return response.json()
}
export const approve = async (id) => {
  const response = await fetch('http://localhost:3000/api/admin/approved', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
    credentials: "include"
  });
  return response.json()
}