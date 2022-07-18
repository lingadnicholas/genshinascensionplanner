import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import primoService from './primoService'

const initialState = {
  primos: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new primo
export const createPrimo = createAsyncThunk(
  'primos/create',
  async (primoData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await primoService.createPrimo(primoData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user primos
export const getPrimos = createAsyncThunk(
  'primos/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await primoService.getPrimos(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user primo
export const deletePrimo = createAsyncThunk(
  'primos/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await primoService.deletePrimo(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const primoSlice = createSlice({
  name: 'primo',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPrimo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPrimo.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.primos.push(action.payload)
      })
      .addCase(createPrimo.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getPrimos.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPrimos.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.primos = action.payload
      })
      .addCase(getPrimos.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deletePrimo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePrimo.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.primos = state.primos.filter(
          (primo) => primo._id !== action.payload.id
        )
      })
      .addCase(deletePrimo.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = primoSlice.actions
export default primoSlice.reducer
