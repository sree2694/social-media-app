import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import chatReducer from './slices/chatSlice';
// import postReducer from './slices/postSlice'; // Optional

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    // post: postReducer,
  },
});

export default store;
