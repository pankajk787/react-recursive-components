import { useEffect, useState } from "react"

const useNestedComments = (data) => {
    const [comments, setComments] = useState(data || []);

    const addReply = (commentId, text, user = "Anonymous") => {
        function addReplyF(comments, commentId, text) {
            return comments.map((comment) => {
                if(comment.id === commentId) {
                    const reply = {
                        id: String(new Date().getTime()),
                        user,
                        text,
                        likes: 0,
                        dislikes: 0,
                        replies: []
                    }
                    return { ...comment, replies: [reply, ...comment.replies]};
                }
                if(comment.replies && comment.replies.length > 0) {
                    return { ...comment, replies: addReplyF(comment.replies, commentId, text)}
                }
                return comment;
            })
        }

        if(commentId) {
            setComments(prev => addReplyF(prev, commentId, text))
        }
        else {
            setComments((prev) => ([
                {
                    id: String(new Date().getTime()),
                    user,
                    text,
                    likes: 0,
                    dislikes: 0,
                    replies: []
                }, ...prev
            ]))
        }
    }

    const addLike = (commentId) => {
        function addLikeF (comments = [], commentId) {
            return comments.map((comment) => {
                if(comment.id === commentId) {
                    return {...comment, likes: comment.likes + 1};
                }
                if(comment.replies && comment.replies.length > 0) { 
                    return {
                        ...comment, 
                        replies: addLikeF(comment.replies, commentId)
                    }
                }
                return comment
            })
        }
        if(commentId) {
            setComments(prev => { return addLikeF(prev, commentId) });
        }
    }

    const addDislike = (commentId) => {
        const dislikeF = (comments = [], commentId) => {
            return comments.map((comment) => {
                if(comment.id === commentId) return {...comment, dislikes: comment.dislikes + 1 };
                if(comment.replies && comment.replies.length > 0 ) {
                    return {...comment, replies: dislikeF(comment.replies, commentId)}
                }
                return comment;
            })
        }

        if(commentId) {
            setComments(prev => dislikeF(prev, commentId));
        }
    }

    const deleteComment = (commentId) => {
        function deleteF(comments, commentId){
            return comments
            .filter((comment) => comment.id !== commentId)
            .map(comment => ({
                ...comment,
                replies: comment.replies ? deleteF(comment.replies, commentId) : []
            }))
        }

        if(commentId) {
            setComments(prev => deleteF(prev, commentId))
        }
    }

    const editComment = (commentId, text) => {
        function edit(comments = [], commentId, text) {
            return comments.map((comment) => {
                if(comment.id === commentId) {
                    return { ...comment, text };
                }
                if(comment.replies && comment.replies.length > 0) {
                    return { ... comment, replies: edit(comments.replies, commentId, comment.replies) };
                }
                return comment;
            })
        }

        if(commentId) {
            setComments(prev => edit(prev, commentId, text))
        }
    }

    useEffect(() => {
        if(comments) {
            localStorage.setItem('comments-data', JSON.stringify(comments))
        }
    }, [comments]);

    return { comments, addReply, addLike, addDislike, deleteComment, editComment }
}

export default useNestedComments;