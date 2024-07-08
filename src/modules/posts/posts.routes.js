import { Router } from "express";
import { addPost, deletePost, getPosts, getPostsOfUser, getSpecificPostWithAuthor, updatePost } from "./posts.controller.js";


const postRouter = Router()


postRouter.get('/', getPosts)
postRouter.get('/:user_id', getPostsOfUser)
postRouter.get('/getPostAndAuthor/:id', getSpecificPostWithAuthor)
postRouter.post('/:user_id', addPost)
postRouter.patch('/:user_id/:id', updatePost)
postRouter.delete('/:user_id/:id', deletePost)



export default postRouter;