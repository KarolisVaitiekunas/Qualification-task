import React, { useEffect, useState } from "react";
//next
import type { NextPage } from "next";
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

const FakePost: NextPage = () => {
  const [post, setPost] = useState<IPostResponse | null>(null);
  const router = useRouter();
  const id = router.query.id!;

  useEffect(() => {
    let fakePosts: Array<IPostResponse>;
    fakePosts = JSON.parse(localStorage.getItem("fakePosts") || "[]");
    const fakePost = fakePosts.find((_post) => Number(_post.id) == Number(id))!;
    setPost(fakePost);
  }, []);

  return (
    <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Card sx={{ width: "400px" }}>
        <CardContent>
          <Typography variant="h6" color="primary" gutterBottom>
            {post?.title}
          </Typography>

          <Typography variant="body1" component="div">
            {post?.body}
          </Typography>

          <Box width="100%" display="flex" justifyContent="space-between" flexDirection="column" mt="30px">
            <Typography variant="h6">User id: {post?.userId}</Typography>
            <Typography variant="h6">id: {post?.id}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FakePost;
