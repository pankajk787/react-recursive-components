import React from 'react';
import { commentsData } from './comments-data';
import Comments from '../../components/Comments/Comments';

const RenderNestedComments = () => {
  return (
    <Comments comments={commentsData} />
  )
}

export default RenderNestedComments
