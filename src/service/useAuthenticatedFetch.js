export default function useAuthenticatedFetch() {
  const authenticatedFetch = async (url, options = {}) => {
    const token = localStorage.getItem("jwt");

    return fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    }).then(res => res.json());
  };

  return authenticatedFetch;
}
