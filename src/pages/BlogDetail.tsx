import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { axiosInstance } from "@/lib/axios";
import type { Post } from "@/types/post";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function BlogDetail() {
  const params = useParams();

  const [blog, setBlog] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getBlog = async () => {
    try {
      const { data } = await axiosInstance.get<Post>(
        `/data/Blogs/${params.slug}`,
      );

      setBlog(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  if (isLoading) {
    return (
      <div>
        <Loading />
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
