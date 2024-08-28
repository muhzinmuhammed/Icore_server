import express from 'express'
import { createPost, getAllPosts, getPostById, editPost, deletePost } from '../controller/postController.js'
import {protect} from '../middleware/protect.js'
const router = express.Router()

//create post
router.post('/create_post',protect, createPost)

//get all posts
router.get('/get_all_posts',protect, getAllPosts)

//get post by id
router.get('/get_post_by_id/:id',protect, getPostById)


//edit post
router.put('/edit_post/:id',protect, editPost)

//delete post
router.put('/delete_post/:id',protect, deletePost)

export default router

