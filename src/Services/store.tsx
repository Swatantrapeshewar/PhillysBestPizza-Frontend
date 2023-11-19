import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Services/Reducers/UserReducer';
import BranchReducer from './Reducers/BranchReducer';

const store = configureStore({
	reducer: {
		user: userReducer,
		branch: BranchReducer,
	},
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
