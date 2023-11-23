import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import HomePage from "./pages/homePage";
import MovieReviewersPage from "./pages/reviewersPage";
import "./style.css";
const MoviePage = lazy(() => import("./pages/movieDetailsPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3600000,
      refetchInterval: 3600000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Link to="/">Home</Link>
        <Suspense fallback={<h1>Loading page</h1>}>
          <Routes>
            <Route
              path="/movies/:id/reviewers"
              element={<MovieReviewersPage />}
            />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route exact path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          </Suspense>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
