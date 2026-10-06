import { createBrowserRouter } from "react-router";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import BlogDetail from "./pages/BlogDetail";
import CreateBlog from "./pages/CreateBlog";
import { authLoader } from "./loaders/authLoader";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/blog/:slug",
    element: <BlogDetail />,
  },
  {
    path: "/write",
    element: <CreateBlog />,
    loader: authLoader,
  },
]);
