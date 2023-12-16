import axios from 'axios';
import { getAccessToken } from '../../Utils/helper';

const baseAPIURL = process.env.API_URL;

export interface DashboardDetails {
	totalItems: {
		count: string;
	};
	totalCategories: {
		count: string;
	};
	totalQuantity: {
		totalAvailableQuantity: string;
	};
	totalWastedItems: {
		count: string;
	};
	lowStocks: unknown[];
	itemsWithTotalStock: ItemWithTotalStock[];
}

interface ItemWithTotalStock {
	itemName: string;
	availableQuantity: string;
	dailyConsumption: string;
	dailyThreshold: string;
	weeklyThreshold: string;
	overallThreshold: string;
	category: string;
	healthScore: number;
}

export interface DashboardResponse {
	dasboardDetails: DashboardDetails;
}

export const getDeshboardDetails = async (
	branchId: string,
): Promise<DashboardDetails> => {
	const AuthHeader = {
		headers: {
			Authorization: `${getAccessToken()}`,
		},
	};
	const response = axios
		.get(`${baseAPIURL}/dashboard/getDetails/${branchId}`, AuthHeader)
		.then(function (response) {
			return response.data.dasboardDetails;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};
