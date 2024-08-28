import postModel from "../model/postModel.js";

//create post model
const createPost = async (req, res) => {
    try {
        const { title, content, userId, status } = req.body;
        const titleExist = await postModel.findOne({ title });
        const descriptionExist = await postModel.findOne({ content });
        if (titleExist || descriptionExist) {
            return res.status(400).json({
                message: "Title or Description already exists",
                error: true
            });
        }
        const newPost = new postModel({
            title,
            content,
            userId,
            status
        });
        await newPost.save();
        res.status(201).json({
            date: newPost,
            message: "Post created successfully",
            error: false
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error: true
        });


    }
}

// get all posts
const getAllPosts = async (req, res) => {
    const { page = 1, limit = 10, search = "", status } = req.query;
    console.log(req.query,"lll");
    

    try {
        const query = {
            isDelete: false,
            $or: [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } }
            ]
        };

        // Add status filter if provided
        if (status !== undefined && status !== '') {
            query.status = status === 'true';
        }

        const totalPosts = await postModel.countDocuments(query);
        const totalPages = Math.ceil(totalPosts / limit);
        const posts = await postModel.find(query)
            .populate({ path: 'userId', select: '-password' })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.status(200).json({
            data: posts,
            currentPage: page,
            totalPages: totalPages,
            totalPosts: totalPosts,
            message: "Posts fetched successfully",
            error: false
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error: true
        });
    }
}



// get post by id
const getPostById = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        const post = await postModel.find({ userId: id }).where({ isDelete: false });


        res.status(200).json({
            data: post,
            message: "Post fetched successfully",
            error: false
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error: true
        });
    }
}

//edit post
const editPost = async (req, res) => {
    const { id } = req.params;
    const { title, content, status } = req.body;

    try {
        // Check if a post with the same title and content already exists, excluding the current post
        const existingPost = await postModel.findOne({
            title,
           
            _id: { $ne: id } // Exclude the current post from the search
        });
        const existingDescription = await postModel.findOne({
            content,
           
            _id: { $ne: id } // Exclude the current post from the search
        });

        if (existingPost || existingDescription) {
            return res.status(409).json({
                message: "A post with the same title and content already exists.",
                error: true
            });
        }

        // Proceed to update the post if no such post exists
        const updatedPost = await postModel.findByIdAndUpdate(
            id,
            { title, content, status },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({
                message: "Post not found",
                error: true
            });
        }

        res.status(200).json({
            message: "Post updated successfully",
            post: updatedPost,
            error: false
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            error: true
        });
    }
}


//delete post
const deletePost = async (req, res, next) => {
    const { id } = req.params
    try {
        const exists = await postModel.findById(id)
        if (exists) {
            const delete_data = await postModel.findByIdAndUpdate(
                { _id: id },
                { isDelete: !exists.isDelete },
                { new: true })
            res.status(200).json({
                message: "success",
                data: delete_data
            })
        }
        else {
            res.status(400).json({
                message: "not exists"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export { createPost, getAllPosts, getPostById, editPost, deletePost }
