import React, { useContext, useState } from "react";
import axios from "axios";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ArrowLeftCircle, Back } from "react-bootstrap-icons";
import Spinner from "./Spinner";

const queryClient = new QueryClient();

export default function PostApp() {
  const [postId, setPostId] = useState(-1);
  return (
    <div className="container">
      <QueryClientProvider client={queryClient}>
        <h3 className=" text-center mt-3">React Query</h3>
        {postId > -1 ? (
          <PostDetail postId={postId} setPostId={setPostId} />
        ) : (
          <Posts setPostId={setPostId} />
        )}
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </div>
  );
}

function usePosts() {
  return useQuery<Post[], Error>("posts", async () => {
    const { data } = await axios.get<Post[]>(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return data;
  }); 
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export function Posts({ setPostId }: any) {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = usePosts();

  if (status === "error") {
    return <span>Error 1 : {error.message}</span>;
  }
  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <div>
      <h3>Posts</h3>
      <div>
        {data &&
          data.map((post) => (
            <p key={post.id}>
              <a
                href="#"
                onClick={() => setPostId(post.id)}
                style={
                  queryClient.getQueryData(["post", post.id])
                    ? { fontWeight: "bold", color: "green" }
                    : { textDecoration: "none", color: "blueviolet" }
                }
              >
                {post.title}
              </a>
            </p>
          ))}
      </div>
      <div>{isFetching ? "Background Updating..." : " "}</div>
    </div>
  );
}

const getPostById = async (id: number) => {
  const { data } = await axios.get<Post>(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return data;
};

function usePost(postId: number) {
  return useQuery<Post, Error>(["post", postId], () => getPostById(postId), {
    enabled: true,
  });
}

export function PostDetail({ postId, setPostId }: any): JSX.Element {
  return (
    <div>
      <BackButton setPostId={setPostId} />
      <Post postId={postId} />
    </div>
  );
}

export function Post({ postId }: any): JSX.Element {
  const { status, data, error, isFetching } = usePost(postId);

  if (status === "error") {
    return <span>Error 2 : {error.message}</span>;
  }

  if (!postId || status === "loading") {
    return <Spinner />;
  }
  return (
    <div>
      {error && <p>{error}</p>}
      {data && !isFetching && (
        <div className="col-4 mx-auto mt-5">
          <div className="card border-primary" style={{ width: " 28rem" }}>
            <div className="card-body">
              <h5 className="card-title text-primary">{data.title}</h5>
              <p className="card-text text-dark">{data.body}</p>
            </div>
          </div>
          <div>{isFetching ? "Background Updating..." : " "}</div>
        </div>
      )}
    </div>
  );
}

function BackButton({ setPostId }: any) {
  const handleBackButton = () => {
    setPostId(-1);
  };
  return (
    <div>
      <ArrowLeftCircle
        type="button"
        className="h1 text-success"
        onClick={handleBackButton}
        href="#"
      />
    </div>
  );
}
