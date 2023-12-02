import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteItem } from '../APIs/ItemAPI';
import {
	addInventoryItem,
	listInventroyItems,
	type AddInventoryItemRequest,
	type InventoryItem,
	updateInventoryItem,
} from '../APIs/InventoryItemAPI';

export const fetchInventoryItems = createAsyncThunk(
	'inventoryItem/list',
	async () => {
		try {
			const response = await listInventroyItems();
			return response;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
);

export const createInventoryItem = createAsyncThunk(
	'inventoryItem/create',
	async (data: AddInventoryItemRequest) => {
		try {
			const response = await addInventoryItem(data);
			return response;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
);

export const updateInventoryItemById = createAsyncThunk(
	'inventoryItem/update',
	async ({
		data,
		inventoryItemId,
	}: {
		data: AddInventoryItemRequest;
		inventoryItemId: string;
	}) => {
		try {
			const response = await updateInventoryItem(data, inventoryItemId);
			return response;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
);

export const deleteItemById = createAsyncThunk(
	'item/deleteItemById',
	async (itemId: string) => {
		try {
			const response = await deleteItem(itemId);
			return response;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
);

export interface ItemState {
	InventoryItems: InventoryItem[];
	loading: boolean;
	error: string | undefined | null;
}

const initialState: ItemState = {
	InventoryItems: [],
	loading: false,
	error: null,
};

const inventoryItemSlice = createSlice({
	name: 'inventoryItem',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// List items
			.addCase(fetchInventoryItems.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchInventoryItems.fulfilled, (state, action) => {
				state.loading = false;
				state.InventoryItems = action.payload;
			})
			.addCase(fetchInventoryItems.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})

			// Create Item
			.addCase(createInventoryItem.pending, (state) => {
				state.loading = true;
			})
			.addCase(createInventoryItem.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(createInventoryItem.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})

			// Update Item
			.addCase(updateInventoryItemById.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateInventoryItemById.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(updateInventoryItemById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})

			// Delete Item
			.addCase(deleteItemById.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteItemById.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(deleteItemById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default inventoryItemSlice.reducer;
