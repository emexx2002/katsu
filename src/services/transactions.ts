import { createApiClient } from "../utils/api";
import { apiRoutes } from "./routes";
import { paramsObjectToQueryString } from "../utils/helpers";
export interface ProcessError {
    message: string;
    timestamp: string;
}

export interface Transaction {
    id: number;
    fee: number;
    amount: number;
    recipientAccountNumber: string;
    reference: string;
    transactionTime: string;
    fromBankCode: string;
    fromAccountNumber: string;
    fromAccountName: string;
    fromAccountBvn: string;
    channel: string;
    bank: string;
    meta: string;
    processErrors: ProcessError[];
    createdDate: string;
    lastModifiedBy: number;
    account?: any;
    virtualAccount?: any;
}

export interface TransactionResponse {
    totalElements: number;
    totalPages: number;
    pageable: any;
    numberOfElements: number;
    size: number;
    content: Transaction[];
    number: number;
    sort: any[];
    first: boolean;
    last: boolean;
    empty: boolean;
}

export const transactionServices = {
    getAllTransactions: async (payload: any) => {
        try {
            const response = await createApiClient().get(apiRoutes.transactions + paramsObjectToQueryString(payload));
            return response;
        } catch (error) {
            throw error;
        }
    },

    getTransactionById: async (id: number) => {
        try {
            const response = await createApiClient().get(`${apiRoutes.transaction}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}; 