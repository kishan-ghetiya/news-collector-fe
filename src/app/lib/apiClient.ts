
const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const apiClient = async <T>(
  endpoint: string,
  options: Omit<RequestInit, "body"> & {
    params?: Record<string, string | number | boolean | null | undefined>;
    body?: any;
  } = {}
): Promise<T> => {
  const url = new URL(`${API_HOST}/${API_VERSION}/${endpoint}`);

  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value != null) {
        url.searchParams.append(key, value.toString());
      }
    });
  }

  const headers = new Headers(options.headers);

  const unauthenticatedEndpoints = [
    "auth/login",
    "auth/register",
    "auth/send-verification-email",
    "auth/verify-email",
  ];

  // Skip token handling for unauthenticated endpoints
  const isUnauthenticatedRequest = unauthenticatedEndpoints.includes(endpoint);

  if (!isUnauthenticatedRequest) {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No access token found");
    }
    headers.append("Authorization", `Bearer ${token}`);
  }

  if (!headers.has("Content-Type") && options.body) {
    headers.append("Content-Type", "application/json");
  }

  let response = await fetch(url.toString(), {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : null,
  });

  if (response.status === 401 && !isUnauthenticatedRequest) {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token found. Please log in again.");
      }
    
      response = await fetch(url.toString(), {
        ...options,
        headers,
        body: options.body ? JSON.stringify(options.body) : null,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "API request failed");
      }

      return response.json() as Promise<T>;
    } catch (error) {
        console.log(error)
      throw new Error( "Token refresh failed. Please log in again.");
    }
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || "API request failed");
  }

  return response.json() as Promise<T>;
};



export default apiClient;
