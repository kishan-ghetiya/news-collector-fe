const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const unauthenticatedEndpoints = [
  "auth/login",
  "auth/register",
  "auth/send-verification-email",
  "auth/verify-email",
  "auth/refresh-tokens",
];

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
  const isUnauthenticated = unauthenticatedEndpoints.includes(endpoint);

  if (!isUnauthenticated) {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No access token found");
    headers.append("Authorization", `Bearer ${token}`);
  }

  if (!headers.has("Content-Type") && options.body) {
    headers.append("Content-Type", "application/json");
  }

  const response = await fetch(url.toString(), {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : null,
  });

  if (response.status === 401 && !isUnauthenticated) {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("Refresh token not found");

    try {
      const refreshResponse = await fetch(`${API_HOST}/${API_VERSION}/auth/refresh-tokens`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!refreshResponse.ok) {
        throw new Error("Failed to refresh tokens");
      }

      const newTokens = await refreshResponse.json();

      localStorage.setItem("accessToken", newTokens.tokens.access.token);
      localStorage.setItem("refreshToken", newTokens.tokens.refresh.token);

      headers.set("Authorization", `Bearer ${newTokens.tokens.access.token}`);

      const retryResponse = await fetch(url.toString(), {
        ...options,
        headers,
        body: options.body ? JSON.stringify(options.body) : null,
      });

      if (!retryResponse.ok) {
        const errorData = await retryResponse.json();
        throw new Error(errorData?.message || "Retry failed", { cause: errorData });
      }

      return retryResponse.json() as Promise<T>;
    } catch (err) {
      console.log(err)
      localStorage.clear();
      throw new Error("Token refresh failed. Please login again.");
    }
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || "API request failed", { cause: errorData });
  }

  return response.json() as Promise<T>;
};

export default apiClient;
