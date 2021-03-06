import { combineReducers } from 'redux';

import users from './users_reducer';
import stocks from './stocks_reducer';
import iex from './iex_reducer';
import portfolio from './portfolios_reducer';
import trades from './trades_reducer';
import stockInfo from "./stock_info_reducer";
import newsAPI from './news_api_reducer';
import watchlist from './watchlist_reducer';

export default combineReducers({
  users,
  stocks,
  portfolio,
  trades,
  iex,
  newsAPI,
  stockInfo,
  watchlist,
});
