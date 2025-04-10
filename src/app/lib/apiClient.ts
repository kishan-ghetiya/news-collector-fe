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
    console.log(url)
    if (options.params) {
        Object.entries(options.params).forEach(([key, value]) => {
            if (value != null) {
                url.searchParams.append(key, value.toString());
            }
        });
    }

    const headers = new Headers(options.headers);
    const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;


    if (!!token) {
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
    console.log(response)
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "API request failed");
    }

    return response.json() as Promise<T>;
};

export default apiClient;
