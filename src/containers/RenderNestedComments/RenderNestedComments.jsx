import React from 'react';
import { commentsData } from './comments-data';
import Comments from '../../components/Comments/Comments';
import useNestedComments from '../../hooks/useNestedComments';
import CommentBox from '../../components/Comments/CommentBox';

const RenderNestedComments = () => {
  const localStorageData = localStorage.getItem('comments-data');
  const data = localStorageData ? JSON.parse(localStorageData) : commentsData;
  const {comments, addDislike, addLike, addReply, deleteComment, editComment} = useNestedComments(data || []);
  return (
    <>
      <CommentBox addReply={addReply} />
      <Comments 
        comments={comments} 
        addReply={addReply}
        addDislike={addDislike}
        addLike={addLike}
        deleteComment={deleteComment}
        editComment={editComment}
      />
    </>
  )
}

export default RenderNestedComments
