// src/redux/articlesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async ({ category, page, country }) => {
    const response = await api.get('/top-headlines', {
      params: {
        category: category || 'general', // Default to 'general' if no category is selected
        page,
        pageSize: 10, // Adjust page size if needed
        country: country || 'us', // Default to 'us' if no country is selected
      },
    });
    return response.data;
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    status: 'idle',
    error: null,
    currentPage: 1,
    totalPages: 1,
    category: '',
    country: 'us', // Default country set to 'us'
    uniqueUrls: {}, // Use an object instead of a Set
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
      state.currentPage = 1; // Reset page to 1 when category changes
      state.articles = [];  // Clear existing articles
      state.uniqueUrls = {}; // Reset uniqueUrls
    },
    setCountry: (state, action) => {
      state.country = action.payload;
      state.currentPage = 1; // Reset page to 1 when country changes
      state.articles = [];  // Clear existing articles
      state.uniqueUrls = {}; // Reset uniqueUrls
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const newArticles = action.payload.articles.filter(
          (article) => !state.uniqueUrls[article.url]
        );
        newArticles.forEach((article) => {
          state.uniqueUrls[article.url] = true;
        });
        state.articles = [...state.articles, ...newArticles];
        state.totalPages = Math.ceil(action.payload.totalResults / 10);
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setPage, setCategory, setCountry } = articlesSlice.actions;

export default articlesSlice.reducer;
