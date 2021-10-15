import React, { ReactElement } from "react";
//mui
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
//interface
import { IPostResponse } from "../interfaces";

interface Props {
  posts: Array<IPostResponse>;
  setPosts: React.Dispatch<React.SetStateAction<IPostResponse[]>>;
}

function PostForm({ posts, setPosts }: Props): ReactElement {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, body, userId } = e.target as typeof e.target & {
      title: { value: string };
      body: { value: string };
      userId: { value: number };
    };

    const fakePost: IPostResponse = {
      title: title.value,
      body: body.value,
      userId: userId.value,
      id: posts.length + 1,
      fake: true,
    };
    e.preventDefault();
    console.log(e.target);
    setPosts([fakePost, ...posts]);

    //if fakePost key is in localstorage get the fakePost and spread it to fakePosts and send them back to local storage
    //else, just send the fakePost to localstorage
    if (localStorage.getItem("fakePosts") !== null) {
      let fakePosts: Array<IPostResponse>;
      fakePosts = JSON.parse(localStorage.getItem("fakePosts") || "[]");
      fakePosts = [fakePost, ...fakePosts];
      localStorage.setItem("fakePosts", JSON.stringify(fakePosts));
      console.log("there is something in local");
    } else {
      console.log("there is nothing in local");
      localStorage.setItem("fakePosts", JSON.stringify([fakePost]));
    }
  };
  return (
    <Box
      component="form"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      height="300px"
      mt="30px"
    >
      <TextField id="filled-basic" name="title" label="Title" variant="standard" required />
      <TextField id="filled-basic" name="body" label="Body" variant="standard" required />
      <TextField id="filled-basic" name="userId" label="UserId" variant="standard" type="number" required />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
}

export default PostForm;
