import { combineReducers } from 'redux'
import cartReducer from './reducers/cart/cart.redux'
import userReducer from './reducers/user/user.reducer'

const rootReducer = combineReducers({
  userReducer,
  cartReducer
})
export default rootReducer
