export async function deleteJSON(url) {
  const response = await fetch(url, { method: "DELETE" });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.headers.get("content-type")?.includes("application/json")
    ? response.json()
    : { message: "Delete successful" };
}
