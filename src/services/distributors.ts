import { createApiClient } from "../utils/api";
import { distributorapiRoutes } from "./routes"
import { paramsObjectToQueryString } from "../utils/helpers";

interface Pageable {
  paged: boolean;
  pageSize: number;
  pageNumber: number;
  unpaged: boolean;
  offset: number;
  sort: Array<Sort>;
}

interface Sort {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
}

interface User {
  id: number;
  role: string;
  accountNonLocked: boolean;
  enabled: boolean;
  registrationStatus: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  distributor: boolean;
  admin: boolean;
  staff: boolean;
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
}

export interface Distributor {
  id: number;
  identifier: string;
  companyName: string;
  name: string;
  email: string;
  active: boolean;
  user: User;
  createdBy: number;
  createdDate: string;
  lastModifiedBy: number;
  lastModifiedDate: string;
}

export interface DistributorsResponse {
  totalElements: number;
  totalPages: number;
  pageable: Pageable;
  numberOfElements: number;
  size: number;
  content: Distributor[];
  number: number;
  sort: Sort[];
  first: boolean;
  last: boolean;
  empty: boolean;
}

export const distributorServices = {
  getAllDistributors: async (payload: any) => {
    const token = JSON.parse(sessionStorage.getItem("ecap-auth") || "{}").state?.token;

    try {
      const response = await createApiClient().get(distributorapiRoutes.distributors + paramsObjectToQueryString(payload));
      return response;
    } catch (error) {
      throw error;
    }
  },

  getDistributor: async (id: number) => {
    const response = await createApiClient().get(`${distributorapiRoutes.distributors}/${id}`);
    return response.data;
  },

  getDistributorById: async (id: number) => {
    try {
      const response = await createApiClient().get(`${distributorapiRoutes.distributor}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getDistributorAccount: async (distributorId: number) => {
    try {
      const response = await createApiClient().get(`${distributorapiRoutes.distributor}/${distributorId}/account`);

      // Check if we received an array with data
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
      // If empty array or non-array, return null to indicate no account
      return null;
    } catch (error) {
      return null;
    }
  },

  createDistributor: async (distributorData: any, createAccount: boolean = false) => {
    try {
      const response = await createApiClient().post(
        distributorapiRoutes.distributors,
        distributorData,
        { params: { createAccount } }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating distributor:", error);
      throw error;
    }
  },

  getDistributorStats: async () => {
    try {
      const response = await createApiClient().get(`${distributorapiRoutes.distributors}/stats`);
      return response.data;
    } catch (error) {
      // Return default stats object to handle errors gracefully
      return {
        total: 0,
        active: 0,
        inactive: 0
      };
    }
  }
};