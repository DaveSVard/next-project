/* Instruments */
import { categorySlice, productSlice } from "./slices";
import { userSlice } from "./slices/userSlice";

export const reducer = {
  user: userSlice.reducer,
  product: productSlice.reducer,
  category: categorySlice.reducer
};
