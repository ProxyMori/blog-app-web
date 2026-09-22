import Loading from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import useAuth from "@/stores/useAuth";
import type { Blog } from "@/types/Blog";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { user, logout } = useAuth();

  const getBlogs = async () => {
    try {
      const { data } = await axiosInstance.get<Blog[]>("/data/Blogs");

      setBlogs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center h-24">
        {user ? (
          <div className="flex items-center gap-4">
            <h1>Welcome, {user.name}</h1>

            <Button variant="destructive" onClick={logout}>
              Logout
            </Button>
            <Link to="/write">
              <Button>Create Blog</Button>
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/login">
              <Button>Login Here</Button>
            </Link>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-100">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-16">
          {blogs.map((blog) => {
            return (
              <div key={blog.objectId} className="border border-black p-8">
                <p className="text-lg font-bold">{blog.title}</p>
                <p>{blog.description}</p>
                <p>{blog.author}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HomePage;
