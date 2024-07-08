import postsModel from "../../../database/models/postsModel.js"
import userModel from "../../../database/models/usersModel.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await postsModel.findAll();
    res.json({ message: "All posts", posts });
  } catch (error) {
    res.status(500).json({ message: "Failed to get posts", error: error.message });
  }
}

export const getPostsOfUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const posts = await postsModel.findAll({
      where: {
        Author: user_id
      }
    });
    res.json({ message: "All posts of user", posts });
  } catch (error) {
    res.status(500).json({ message: "Failed to get posts of user", error: error.message });
  }
}

export const addPost = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { title, content } = req.body;
    const post = await postsModel.create({
      title, content, Author: user_id
    });
    res.status(201).json({ message: "Post Created", post });
  } catch (error) {
    res.status(500).json({ message: "Failed to create post", error: error.message });
  }
}

export const updatePost = async (req, res) => {
  try {
    const { user_id, id } = req.params;
    const { title, content } = req.body;
    const post = await postsModel.update({
      title, content
    }, {
      where: {
        Author: user_id,
        id
      }
    });
    res.status(200).json({ message: "Post Updated", post });
  } catch (error) {
    res.status(500).json({ message: "Failed to update post", error: error.message });
  }
}

export const deletePost = async (req, res) => {
  try {
    const { user_id, id } = req.params;
    const post = await postsModel.destroy({
      where: {
        Author: user_id,
        id
      }
    });
    res.status(200).json({ message: "Post Deleted", post });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post", error: error.message });
  }
}


// GET A SPECIFIC POST WITH THE AUTHOR :

export const getSpecificPostWithAuthor = async (req, res) => {
  const {id} = req.params
  
  try {
    const post = await postsModel.findOne({
      where : {
        id
      }
    });

    const Author = await post.Author

    const user = await userModel.findOne({
      where : {
        id : Author
      }
    })

    
    res.json({ message: "Post Found", post : post , user : user});
  } catch (error) {
    res.status(500).json({ message: "Failed to get posts", error: error.message });
  }
}