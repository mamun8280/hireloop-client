

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const createJob = async (data: Record<string, unknown>) => {
  console.log("Sending Job Data:", data);

  const res = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || `Request failed: ${res.status}`);
  }
  return result;
};




