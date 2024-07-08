import commentsModel from "../../../database/models/commentsModel.js"

export const getComments = async (req, res) => {
  try {
    const comments = await commentsModel.findAll();
    res.json({ message: "All comments", comments });
  } catch (error) {
    res.status(500).json({ message: "Failed to get comments", error: error.message });
  }
}

export const getCommentsOfUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const comments = await commentsModel.findAll({
      where: {
        UserId: user_id
      }
    });
    res.json({ message: "All comments of user", comments });
  } catch (error) {
    res.status(500).json({ message: "Failed to get comments of user", error: error.message });
  }
}

export const addComment = async (req, res) => {
  try {
    const { user_id, PostId } = req.params;
    const { content } = req.body;
    const comment = await commentsModel.create({
      content, UserId: user_id, PostId
    });
    res.status(201).json({ message: "Comment Created", comment });
  } catch (error) {
    res.status(500).json({ message: "Failed to create comment", error: error.message });
  }
}

export const updateComment = async (req, res) => {
  try {
    const { user_id, PostId } = req.params;
    const { content } = req.body;
    const comment = await commentsModel.update({
      content
    }, {
      where: {
        UserId: user_id,
        PostId
      }
    });
    res.status(200).json({ message: "Comment Updated", comment });
  } catch (error) {
    res.status(500).json({ message: "Failed to update comment", error: error.message });
  }
}

export const deleteComment = async (req, res) => {
  try {
    const { user_id, id } = req.params;
    const comment = await commentsModel.destroy({
      where: {
        UserId: user_id,
        id
      }
    });
    res.status(200).json({ message: "Comment Deleted", comment });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete comment", error: error.message });
  }
}
