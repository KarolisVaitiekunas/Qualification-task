import React, { useEffect, useState } from "react";
//next
import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
//mui
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { getPost } from "../../api";
import { useRouter } from "next/router";
///interfaces
import { IPostResponse } from "../../interfaces";
//api
import { getPosts } from "../../api";

const Post: NextPage<{ post: IPostResponse }> = ({ post }) => {
  const [_post, setPost] = useState<IPostResponse>(post);
  const router = useRouter();
  const id = router.query.id!;

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetch = async () => {
      //if _post is from localstorage
      if (Number(id) > 100) {
        let fakePosts: Array<IPostResponse>;
        fakePosts = JSON.parse(localStorage.getItem("fakePosts") || "[]");
        const fakePost = fakePosts.find((_post) => Number(_post.id) == Number(id))!;
        setPost(fakePost);
        return;
      }
      // setPost(await getPost(id));
    };
    fetch();
  }, [id]);

  return (
    <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Card sx={{ width: "400px" }}>
        <CardContent>
          <Typography variant="h6" color="primary" gutterBottom>
            {_post?.title}
          </Typography>

          <Typography variant="body1" component="div">
            {_post?.body}
          </Typography>

          <Box width="100%" display="flex" justifyContent="space-between" flexDirection="column" mt="30px">
            <Typography variant="h6">User id: {_post?.userId}</Typography>
            <Typography variant="h6">id: {_post?.id}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  let data = await getPosts();

  // map data to an array of path objects with params (id)
  const paths = data.map((_post) => {
    return {
      params: { id: _post.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const data = await res.json();
  return {
    props: { post: data },
  };
};
