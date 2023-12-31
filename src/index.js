import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApiProvider } from "./contexts/ApiProvider";
import { BrowserRouter } from 'react-router-dom';
import { AnimeFavouritesProvider } from "./contexts/AnimeFavouritesProvider";
import { SearchResultsProvider } from './contexts/SearchResultsProvider';
import { FavouritesDataProvider } from "./contexts/FavouritesDataProvider";
import { RecommendationsProvider } from "./contexts/RecommendationsProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApiProvider>
        <AnimeFavouritesProvider>
          <SearchResultsProvider>
            <FavouritesDataProvider>
              <RecommendationsProvider>
                <App />
              </RecommendationsProvider>
            </FavouritesDataProvider>
          </SearchResultsProvider>
        </AnimeFavouritesProvider>
      </ApiProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
