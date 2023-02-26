import React, { useRef, useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import useStyles from "./PostDetailStyle";
import { commentPost } from "../../actions/posts";
const CommentSection = ({ post }) => {
  const classes = useStyles();
  const commentsRef = useRef();
  const [comments, setComments] = useState(post?.comments || []);
  const [commentText, setCommentText] = useState("");
  const profile = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const handleSubmitComment = async () => {
    const finalComment = `${profile?.user?.displayName} : ${commentText}`;
    const newComments = await dispatch(commentPost(finalComment, post._id));
    console.log(newComments);
    setComments(newComments);
    setCommentText("");
    commentsRef.current.scrollIntoView();
  };
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((comment, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong> {comment.split(": ")[0]} </strong>
              {comment.split(": ")[1]} 
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {!!profile?.user?.displayName && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a comment
            </Typography>
            <TextField
              fullWidth
              style={{
                padding: "10px",
                marginTop: "5px",
              }}
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              color="primary"
              disabled={!commentText}
              variant="contained"
              onClick={handleSubmitComment}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
