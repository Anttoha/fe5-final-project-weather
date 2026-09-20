export const fetchJson = async (url, params = {}) => {
  const queryParams = new URLSearchParams(params).toString();
  const fullUrl = queryParams ? `${url}?${queryParams}` : url;

  const response = await fetch(fullUrl);
  const data = await response.json();

  
  if (!response.ok || data?.status === "error") {
    const errorMessage = data?.message || `Bad HTTP: ${response.status}`;
    throw new Error(errorMessage);
  }

  return data;
};