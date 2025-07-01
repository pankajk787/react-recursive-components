import { useState } from "react";
import { ReplyInputField } from "./Comments";

const CommentBox = ({addReply}) => {
  const [show, setShow] = useState(false);
  const onCancel = () => {
    setShow(false);
  }
  const onSubmit = (text) => {
    addReply(null, text);
    setShow(false);
  }
  return (<div className="comment-input-box">
      {
        show ? <ReplyInputField action="add-comment" onCancel={onCancel} onSubmit={onSubmit}/> : 
        <button onClick={() => {setShow(true)}}>Add a Comment</button>
      }
    </div>
  ) 
}

export default CommentBox;