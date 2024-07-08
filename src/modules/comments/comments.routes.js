import { Router } from "express";
import { addComment, deleteComment, getComments, getCommentsOfUser, updateComment } from "./comments.controller.js";


const commentsRouter = Router()


commentsRouter.get('/', getComments)
commentsRouter.get('/:user_id/', getCommentsOfUser)
commentsRouter.post('/:user_id/:PostId', addComment)
commentsRouter.patch('/:user_id/:PostId', updateComment)
commentsRouter.delete('/:user_id/:id', deleteComment)


export default commentsRouter;