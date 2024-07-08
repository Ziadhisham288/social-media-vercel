import express from 'express'
import connectionDB from './database/connection.js';
import userRouter from './src/modules/users/users.routes.js';
import postRouter from './src/modules/posts/posts.routes.js';
import commentsRouter from './src/modules/comments/comments.routes.js';

const app = express();
const PORT = 8080 || process.env.PORT;

app.use(express.json())
connectionDB()

app.use("/auth", userRouter)
app.use("/posts", postRouter)
app.use("/comments", commentsRouter)

app.listen(PORT, () => {
  console.log(`App is running on port : ${PORT}`)
})
