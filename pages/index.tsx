import React, { useState, useEffect } from "react";
//next
import type { GetStaticProps, NextPage } from "next";
//mui
import Head from "next/head";
import Image from "next/image";
import { getPosts } from "../api";
import PostTable from "../components/PostTable";
import PostForm from "../components/PostForm";
//interface
import { IPostResponse } from "../interfaces";

const Home: NextPage<{ posts: Array<IPostResponse> }> = ({ posts }) => {
  const [_posts, setPosts] = useState<Array<IPostResponse>>(posts);

  useEffect(() => {
    if (localStorage.getItem("fakePosts") !== null) {
      let fakePosts = JSON.parse(localStorage.getItem("fakePosts") || "[]");
      setPosts([...fakePosts, ..._posts]);
    }
  }, []);
  return (
    <div>
      <PostTable posts={_posts} />
      <PostForm posts={_posts} setPosts={setPosts} />
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  let posts = await getPosts();
  return {
    props: { posts },
  };
};
