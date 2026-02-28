/** API error class with status code and optional error code */
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string
  ) {
    super(message)
    this.name = "ApiError"
  }
}

/** Type-safe API client that attaches Clerk session tokens to requests */
class ApiClient {
  private baseUrl: string
  private getToken: (() => Promise<string | null>) | null = null

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000"
  }

  /** Sets the Clerk token getter function — called by ClerkProvider wrapper */
  setTokenGetter(getter: () => Promise<string | null>) {
    this.getToken = getter
  }

  /** Core request method with automatic token attachment and error handling */
  async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken ? await this.getToken() : null
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ error: "Network error" }))
      throw new ApiError(
        response.status,
        error.error || "Unknown error",
        error.code
      )
    }

    return response.json() as Promise<T>
  }

  /** HTTP GET with optional query params */
  get<T>(path: string, opts?: { params?: Record<string, unknown> }): Promise<T> {
    if (opts?.params) {
      const searchParams = new URLSearchParams()
      Object.entries(opts.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.append(key, String(value))
        }
      })
      const queryString = searchParams.toString()
      const url = queryString ? `${path}?${queryString}` : path
      return this.request<T>(url)
    }
    return this.request<T>(path)
  }

  /** HTTP POST with JSON body */
  post<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>(path, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  /** HTTP PUT with JSON body */
  put<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>(path, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  /** HTTP PATCH with JSON body */
  patch<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>(path, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  /** HTTP DELETE */
  delete<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: "DELETE" })
  }
}

export const api = new ApiClient()
