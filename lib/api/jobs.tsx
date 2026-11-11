

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// manage jobs api mongodb to frontend
export const getjobs = async () => {
  const res = await fetch(`${BASE_URL}/jobs`)
  return res.json()
}