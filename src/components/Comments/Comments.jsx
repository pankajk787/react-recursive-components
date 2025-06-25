import React, { useState } from "react";
import "./style.css";
const Comments = ({ comments, level = 0 }) => {
  return (
    <div className={`comment-container level-${level}`}>
      {(comments || []).map((comment) => {
        return (
          <React.Fragment key={comment.id}>
            <Comment comment={comment} level={level} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

const Comment = ({ comment, level }) => {
  const [expandedReplies, setExpandedReplies] = useState(false);
  const replyCount = (comment.replies || []).length;
  return (
    <>
      <div className="comment-box">
        <span className="username">{comment.user}</span>
        <p className="comment-text">{comment.text}</p>
        <div className="comment-btns">
          <div className="comment-btn-likes">
            <button className="btn like-btn">
              👍 {comment.likes > 0 && comment.likes}
            </button>{" "}
          </div>
          <div className="comment-btn-dislikes">
            <button className="btn dislike-btn">
              👎 {comment.dislikes > 0 && comment.dislikes}
            </button>
          </div>
          <button className="btn">Reply</button>
        </div>
      </div>
      {replyCount > 0 && (
        <div>
          <button
            className="btn"
            onClick={() => setExpandedReplies((prev) => !prev)}
          >
            {replyCount} {replyCount > 1 ? "Replies" : "Reply"}{" "}
            {expandedReplies ? "▼" : "▲"}
          </button>
          {expandedReplies && <Comments comments={comment.replies} level={level+1}/>}
        </div>
      )}
    </>
  );
};

export default Comments;
