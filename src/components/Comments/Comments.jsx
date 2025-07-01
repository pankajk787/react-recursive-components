import React, { useEffect, useRef, useState } from "react";
import "./style.css";
const Comments = ({ comments, level = 0, addReply, addDislike, addLike, deleteComment, editComment }) => {
  return (
    <div className={`comment-container level-${level}`}>
      {(comments || []).map((comment) => {
        return (
          <React.Fragment key={comment.id}>
            <Comment 
              comment={comment} 
              level={level} 
              addReply={addReply}
              addDislike={addDislike} 
              addLike={addLike} 
              deleteComment={deleteComment} 
              editComment={editComment}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

const Comment = ({ comment, level, addReply, addDislike, addLike, deleteComment, editComment }) => {
  const [expandedReplies, setExpandedReplies] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState({ status: false, action: null });
  const replyCount = (comment.replies || []).length;
  const handleAddReplyClick = (action) => {
    setShowReplyInput({ status: true, action })
  }

  const onCancelReply = () => {
    setShowReplyInput({ status: false, action: null });
  }

  const addReplySubmit = (commentId, text) => {
    addReply(commentId, text)
    setShowReplyInput({ status: false, for: null });
    setExpandedReplies(true);
  }

  const editCommentSubmit = (commentId, text) => {
    editComment(commentId, text)
    setShowReplyInput({ status: false, for: null });
  }

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId)
  }

  return (
    <>
      <div className="comment-box">
        <span className="username">{comment.user}</span>
        {
          (showReplyInput.status &&  showReplyInput.action === 'edit-reply') ?
          <ReplyInputField action={showReplyInput.action} defaultValue={comment.text} onSubmit={(text) => editCommentSubmit(comment.id, text)} onCancel={onCancelReply} /> :
          <p className="comment-text">{comment.text}</p>
        }
        <div className="comment-btns">
          <div className="comment-btn-likes">
            <button className="btn like-btn" onClick={() => {
              addLike(comment.id)
            }}>
              👍 {comment.likes > 0 && comment.likes}
            </button>{" "}
          </div>
          <div className="comment-btn-dislikes">
            <button className="btn dislike-btn" onClick={() => {
              addDislike(comment.id)
            }}>
              👎 {comment.dislikes > 0 && comment.dislikes}
            </button>
          </div>
          <button className="btn" onClick={() => handleAddReplyClick("add-reply")}>Reply</button>
          <button className="btn" onClick={() => handleAddReplyClick("edit-reply")}>Edit</button>
          <button className="btn" onClick={() => handleDeleteComment(comment.id)}>Delete</button>
        </div>
        {
          (showReplyInput.status && showReplyInput.action === 'add-reply') &&
          <ReplyInputField action={showReplyInput.action} onSubmit={(text) => addReplySubmit(comment.id, text)} onCancel={onCancelReply} />
        }
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
          {expandedReplies && <Comments 
              comments={comment.replies} 
              level={level+1}
              addReply={addReply}
              addDislike={addDislike} 
              addLike={addLike} 
              deleteComment={deleteComment}
              editComment={editComment}
            />}
        </div>
      )}
    </>
  );
};

export const ReplyInputField = ({defaultValue, onCancel, onSubmit, action }) => {
  const textInputRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = formData.get("reply-input");
    onSubmit(value);
  }

  useEffect(() => {
    if(textInputRef.current) {
      const textarea = textInputRef.current;
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }
  }, []);
  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea ref={textInputRef} autoFocus required name="reply-input" defaultValue={defaultValue} />
      <div className="reply-input-btns">
        <button className="btn cancel" type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className={`btn ${action}`} type="submit">
          {action === 'add-reply' ? "Reply" : "Submit" }
        </button>
      </div>
    </form>
  )
}

export default Comments;
