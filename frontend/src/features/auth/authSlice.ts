import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import type { AxiosError } from "axios";

// Type guard for axios error
function isAxiosError(
  error: unknown
): error is AxiosError<{ message?: string }> {
  return (
    typeof error === "object" &&
    error !== null &&
    "isAxiosError" in error &&
    (error as AxiosError).isAxiosError === true
  );
}

export interface AuthState {
  user: null | {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
  const res = await axios.post("/api/auth/login", data);
      return res.data;
    } catch (err: unknown) {
      if (isAxiosError(err) && err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      }
      return rejectWithValue("Login failed");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    data: { name: string; email: string; password: string; role: string },
    { rejectWithValue }
  ) => {
    try {
  const res = await axios.post("/api/auth/register", data);
      return res.data;
    } catch (err: unknown) {
      if (isAxiosError(err) && err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      }
      return rejectWithValue("Registration failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        // Persist token to localStorage for axios interceptor
        if (typeof window !== 'undefined' && action.payload.token) {
          localStorage.setItem('token', action.payload.token);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
