import { deleteCookie, getCookie, handleSetCookie } from "@/components/utils";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const apiClient = async <T>(
  endpoint: string,
  options: Omit<RequestInit, "body"> & {
    params?: Record<string, string | number | boolean | null | undefined>;
    body?: unknown;
  } = {}
): Promise<T> => {
  const url = new URL(`${API_HOST}/${API_VERSION}/${endpoint}`);
  const token = getCookie("accessToken");
  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value != null) {
        url.searchParams.append(key, value.toString());
      }
    });
  }

  const headers = new Headers(options.headers);

  if (token) {
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
  const refreshToken = getCookie("refreshToken");
  const userId = getCookie("userId");
  if (response.status === 401 && refreshToken && userId) {
    if (!refreshToken) throw new Error("Refresh token not found");
    try {
      const refreshResponse = await fetch(
        `${API_HOST}/${API_VERSION}/auth/refresh-tokens`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (!refreshResponse.ok) {
        throw new Error("Failed to refresh tokens");
      }

      const newTokens = await refreshResponse.json();

      handleSetCookie({
        name: "accessToken",
        value: newTokens.tokens.access.token,
      });
      handleSetCookie({
        name: "refreshToken",
        value: newTokens.tokens.refresh.token,
      });

      headers.set("Authorization", `Bearer ${newTokens.tokens.access.token}`);

      const retryResponse = await fetch(url.toString(), {
        ...options,
        headers,
        body: options.body ? JSON.stringify(options.body) : null,
      });

      if (!retryResponse.ok) {
        const errorData = await retryResponse.json();
        throw new Error(errorData?.message || "Retry failed", {
          cause: errorData,
        });
      }

      return retryResponse.json() as Promise<T>;
    } catch (err) {
      console.log(err);
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      deleteCookie("userId");
      throw new Error("Token refresh failed. Please login again.");
    }
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || "API request failed", {
      cause: errorData,
    });
  }

  return response.json() as Promise<T>;
};

export default apiClient;
