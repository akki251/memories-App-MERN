import React, { useState, useEffect } from 'react';
import useStyles from './FormStyle';

import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import '../../index.css';

import { useHistory } from 'react-router-dom';
const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const toBeUpdatedPost = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => currentId === p._id) : null,
  );

  const userLoggedInName =
    JSON.parse(localStorage.getItem('profile'))?.name ||
    JSON.parse(localStorage.getItem('profile'))?.user.displayName;

  const classes = useStyles();
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

  useEffect(() => {
    if (toBeUpdatedPost) {
      setPostData(toBeUpdatedPost);
    }
  }, [toBeUpdatedPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    if (currentId) {
      await dispatch(updatePost(currentId, { ...postData, name: userLoggedInName }));
    } else {
      await dispatch(createPost({ ...postData, name: userLoggedInName }, history));
    }

    setLoading(false);
    clear();
  };

  const clear = () => {
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    });
    setCurrentId(null);
  };

  if (!userLoggedInName) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      {/* {loading ? <h1>Loading...</h1> : <h1>finished loading</h1>} */}
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6"></Typography>
        {currentId ? 'Editing a Memory' : 'Creating a Memory'}
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) =>
            setPostData({
              ...postData,
              title: e.target.value,
            })
          }
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({
              ...postData,
              message: e.target.value,
            })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({
              ...postData,
              tags: e.target.value.split(','),
            })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          />
        </div>
        (
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          disabled={loading}
        >
          Submit
        </Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
