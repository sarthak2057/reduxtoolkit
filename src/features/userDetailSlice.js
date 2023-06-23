import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

//create action
export const createUser = createAsyncThunk(
  'createUser',
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      'https://649514b6b08e17c91791a1b3.mockapi.io/crud',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )
    try {
      const result = await response.json()
      return result
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
//update action
export const updateUser = createAsyncThunk(
  'updateUser',
  async (data, { rejectWithValue }) => {
    console.log(data)
    const response = await fetch(
      `https://649514b6b08e17c91791a1b3.mockapi.io/crud/${data.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )
    try {
      const result = await response.json()
      return result
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

//read action
export const showUser = createAsyncThunk(
  'showUser',
  async (rejectWithValue) => {
    const response = await fetch(
      'https://649514b6b08e17c91791a1b3.mockapi.io/crud'
    )
    try {
      const results = await response.json()
      return results
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
//delete action
export const deleteUser = createAsyncThunk(
  'deleteUser',
  async (id, rejectWithValue) => {
    const response = await fetch(
      `https://649514b6b08e17c91791a1b3.mockapi.io/crud/${id}`,
      {
        method: 'DELETE',
      }
    )
    try {
      const results = await response.json()
      return results
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const userDetail = createSlice({
  name: 'userDetail',
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData: [],
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload
    },
  },
  extraReducers: {
    [createUser.pending]: (state) => {
      state.loading = true
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false
      state.users.push(action.payload)
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [updateUser.pending]: (state) => {
      state.loading = true
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false
      state.users = state.users.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      )
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [showUser.pending]: (state) => {
      state.loading = true
    },
    [showUser.fulfilled]: (state, action) => {
      state.loading = false
      state.users = action.payload
    },
    [showUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [deleteUser.pending]: (state) => {
      state.loading = true
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false
      const { id } = action.payload
      if (id) {
        state.users = state.users.filter((ele) => ele.id !== id)
      }
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
  },
})

export default userDetail.reducer

export const { searchUser } = userDetail.actions
