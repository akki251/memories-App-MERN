import { GridListTileBar } from '@material-ui/core';
import { Grid, CircularProgress } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post';

import useStyles from './PostsStyle.js';

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();

  let { posts, isLoading } = useSelector((state) => state.posts);

  // console.log(posts);

  // console.log(isLoading);
  // if (!isLoading && posts.length === 0) {
  //   return <h1>NO posts</h1>;
  // }

  // console.log(isLoading, posts);
  return (
    <>
      {!isLoading && posts.length === 0 && <h1>No Posts Found</h1>}
      {(isLoading || posts === 'default') && <CircularProgress />}
      {!isLoading && (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {posts.map((post) => (
            <Grid type="item" key={post._id} item xs={12} sm={12} md={6} lg={3}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Posts;
