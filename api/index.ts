import { IPostResponse } from "./../interfaces/index";
export const getPosts = async (): Promise<Array<IPostResponse>> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
    method: "GET",
  });
  const posts = await response.json();
  return posts;
};

export const getPost = async (id: string | string[]): Promise<IPostResponse> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "GET",
  });
  const post = await response.json();
  return post;
};
