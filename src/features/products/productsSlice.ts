import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';

interface ProductsState {
  value: Product[];
  error: string | null;
}

const initialState: ProductsState = {
  value: [],
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const response = await fetch(
      'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1',
      {
        method: 'GET',
        headers: {
          'X-API-KEY': 'f74db4e6-d859-4aba-bc0b-99c1fae26724',
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();

    return data.films.map((movie: any) => ({
      id: movie.filmId,
      title: movie.nameRu || movie.nameEn || 'Untitled',
      description:
        'У этой карточки нет описание, но вы можете создать свою и добавить его ^_^ У этой карточки нет описание, но вы можете создать свою и добавить его ^_^ У этой карточки нет описание, но вы можете создать свою и добавить его ^_^ У этой карточки нет описание, но вы можете создать свою и добавить его ^_^',
      img: movie.posterUrl,
      favorites: false,
    }));
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter(
        (product) => product.id !== action.payload,
      );
    },
    toggleFavorite: (
      state,
      action: PayloadAction<{ id: number; favorites: boolean }>,
    ) => {
      const product = state.value.find(
        (product) => product.id === action.payload.id,
      );
      if (product) {
        product.favorites = action.payload.favorites;
      }
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.value.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.value = action.payload;
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { deleteProduct, toggleFavorite, addProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
