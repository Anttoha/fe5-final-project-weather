export const fetchJson = async (url, params = {}) => {
  const searchParams = new URLSearchParams(params);

  const response = await fetch(
    `${url}?${searchParams.toString()}`,
  );

  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status}`,
    );
  }

  return response.json();
};