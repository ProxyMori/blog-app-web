import { Button } from "@/components/ui/button";
import useGetPostBySlug from "@/hooks/api/post/useGetPostBySlug";
import { Link, useParams } from "react-router-dom";

function BlogDetail() {
  const params = useParams();

  const { data: blog, isPending } = useGetPostBySlug(params.slug);

  if (isPending) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div>
        <p>Blog Not Found</p>

        <Link to="/">
          <Button>Go to Homepage</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <img
        src={blog.thumbnail || ""}
        alt="thumbnail blog"
        className="h-[400px] w-full object-cover"
      />

      <h1 className="text-3xl font-bold">Blog Detail - {blog.title}</h1>

      <p>
        {blog.category} - {blog.user.name}
      </p>

      <p>{blog.description}</p>

      <p>{blog.content}</p>
    </div>
  );
}

export default BlogDetail;
