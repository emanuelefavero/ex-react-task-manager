export const fetchJson = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};
