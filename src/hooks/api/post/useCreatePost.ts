import { axiosInstance } from "@/lib/axios";
import type { CreatePostSchema } from "@/Schema/createBlog";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";

function useCreatePost() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: CreatePostSchema) => {
      const formData = new FormData();

      formData.append("title", payload.title);
      formData.append("description", payload.description);
      formData.append("category", payload.category);
      formData.append("content", payload.content);
      formData.append("thumbnail", payload.thumbnail);

      await axiosInstance.post("/posts", formData);
    },

    onSuccess: () => {
      alert("Create post success");
      navigate("/");
    },

    onError: (error: AxiosError<{ message: string }>) => {
      alert(error.response?.data.message || "Create post failed!");
    },
  });
}

export default useCreatePost;
