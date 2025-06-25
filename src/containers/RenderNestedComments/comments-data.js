export const commentsData = [
    {
        id: "1",
        user: 'Alice',
        text: 'This is a top-level comment 1 from Alice',
        likes: 15,
        dislikes: 1,
        replies: [
            {
                id: "2",
                user: "Bob",
                text: 'Replying to Alice',
                likes: 3,
                dislikes: 0,
                replies: [
                    {
                        id: "3",
                        user: "John",
                        text: "Replying to Bob",
                        likes: 1,
                        dislikes: 2,
                        replies: []
                    },
                    {
                        id: "4",
                        user: 'Maria',
                        text: "Replying to Alice, Maria this side.",
                        likes: 0,
                        dislikes: 0,
                        replies: []
                    }
                ]
            },
            {
              id: "5",
              user: 'Samyra',
              text: "Hi I'm Samyra, Replying to Alice" ,
              likes: 0,
              dislikes: 2,
              replies: [
                {
                    id: "6",
                    user: "Pankaj",
                    text: "Reply to Samyra from Pankaj",
                    likes: 0,
                    dislikes: 0,
                    replies: []
                }
              ] 
            },
            {
                id: "7",
                user: "Bella",
                text: "Reply to Samyra from Bella",
                likes: 1,
                dislikes: 1,
                replies: [
                    {
                        id: "8",
                        user: "Xiang",
                        text: "Reply to Bella from Xiang",
                        replies: [],
                        likes: 1,
                        dislikes: 1
                    }
                ]
            }
        ]
    },
    {
        id: "9",
        user: "Milli",
        text: "This is a top level comment 2 from Milli",
        replies: [],
        likes: 2,
        dislikes: 1
    }
]