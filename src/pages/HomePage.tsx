import { Button } from "@/components/ui/button";
import GlobalPagination from "@/components/GlobalPagination";
import useGetPosts from "@/hooks/api/post/useGetPosts";
import { useAuth } from "@/stores/useAuth";
import { Link } from "react-router";
import { useState } from "react";

function HomePage() {
  const [page, setPage] = useState<number>(1);

  const { user, logout } = useAuth();

  const { data: blogs, isPending } = useGetPosts({
    page,
  });

  return (
    <div>
      {/* HEADER */}
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

      {/* BLOG LIST */}
      {isPending ? (
        <div className="flex justify-center items-center h-100">
          <div
            className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black"
            role="status"
            aria-label="Loading"
          />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-16">
          {blogs?.data.map((blog) => {
            return (
              <Link key={blog.id} to={`/blogs/${blog.slug}`}>
                <div className="border border-black p-8">
                  <p className="text-lg font-bold">{blog.title}</p>

                  <p>{blog.description}</p>

                  <p>{blog.user.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* PAGINATION */}
      {blogs?.meta && (
        <GlobalPagination
          currentPage={blogs.meta.page}
          totalPage={Math.ceil(blogs.meta.total / blogs.meta.take)}
          onChangePage={(page) => setPage(page)}
        />
      )}
    </div>
  );
}

export default HomePage;
