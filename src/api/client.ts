import ky from "ky";

const BASE_URL = import.meta.env.PROD
  ? "https://your-api-domain.com"
  : "http://localhost:3001";

// ky 인스턴스 생성
const kyInstance = ky.create({
  prefixUrl: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      request => {
        console.log("API Request:", request.method, request.url);
      },
    ],
    beforeError: [
      error => {
        console.error("API Error:", error);
        return error;
      },
    ],
    afterResponse: [
      (_request, _options, response) => {
        console.log("API Response:", response.status, response.url);
      },
    ],
  },
  retry: {
    limit: 2,
    methods: ["get"],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
  timeout: 10000,
});

// ky 인스턴스에 편의 메서드 추가 (기존 API와 호환성 유지)
export const api = {
  get: <T>(
    endpoint: string,
    searchParams?: Record<string, string | number>
  ) => {
    return kyInstance.get(endpoint, { searchParams }).json<T>();
  },

  post: <T>(endpoint: string, body?: any) => {
    // FormData인 경우 Content-Type 헤더 제거
    if (body instanceof FormData) {
      return kyInstance
        .post(endpoint, {
          body,
          headers: {}, // Content-Type 헤더 제거로 브라우저가 자동 설정
        })
        .json<T>();
    }
    return kyInstance.post(endpoint, { json: body }).json<T>();
  },

  put: <T>(endpoint: string, body?: any) => {
    if (body instanceof FormData) {
      return kyInstance
        .put(endpoint, {
          body,
          headers: {},
        })
        .json<T>();
    }
    return kyInstance.put(endpoint, { json: body }).json<T>();
  },

  delete: <T>(endpoint: string) => {
    return kyInstance.delete(endpoint).json<T>();
  },

  patch: <T>(endpoint: string, body?: any) => {
    if (body instanceof FormData) {
      return kyInstance
        .patch(endpoint, {
          body,
          headers: {},
        })
        .json<T>();
    }
    return kyInstance.patch(endpoint, { json: body }).json<T>();
  },
};

// 기존 코드와의 호환성을 위해 api를 apiClient로도 export
export const apiClient = api;
