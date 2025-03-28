import { createApiClient } from "../utils/api"
import { authApiRoutes } from "./routes"
import { AuthActions } from "../zustand/auth.store";

export const authServices = {
  login: async (payload: any) => {
    try {
      const response = await createApiClient().post(authApiRoutes.login, payload);

      // Return the data and let the component handle navigation
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
  signUp: async (payload: any) => {
    const response = await createApiClient().post(authApiRoutes.signUp, payload);
    return response.data;
  },
  // google: async () => {
  //   const response = await createApiClient().get(authApiRoutes.google);
  //   return response.data;
  // },
  refreshToken: async (payload: any) => {
    const response = await createApiClient().post(authApiRoutes.refreshToken, payload);
    return response.data;
  },
  verifyOtp: async (payload: any) => {
    const response = await createApiClient().post(authApiRoutes.verifyOtp, payload);
    return response.data;
  },
  forgotPassword: async (payload: any) => {
    const response = await createApiClient().post(authApiRoutes.forgotPassword, payload);
    return response.data;
  },
  resetPassword: async (payload: any) => {
    const response = await createApiClient().post(authApiRoutes.resetPassword, payload);
    return response.data;
  },
  sendOtp: async (payload: any) => {
    const response = await createApiClient().post(authApiRoutes.sendOtp, payload);
    return response.data;
  },
  changePassword: async (data: { email: string; oldPassword: string; newPassword: string; role: string }) => {
    const response = await createApiClient().post('/onboard/change-password', data);
    return response.data;
  },
}