import commentsModel from "../../../database/models/commentsModel.js";
import postsModel from "../../../database/models/postsModel.js";
import userModel from "../../../database/models/usersModel.js";
import bcrypt from 'bcrypt';

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.findAll();
    res.status(200).json({ message: "Done", users });
  } catch (error) {
    res.status(500).json({ message: "Failed to get users", error: error.message });
  }
};

export const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ username, email, password: hashedPassword });
    res.json({ message: "User created", createdUser: user });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", error: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({
      where: {
        email
      }
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({ message: "Welcome to your account!", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to login", error: error.message });
  }
};

export const Logout = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await userModel.findOne({
      where: {
        id: user_id
      }
    });
    res.json({ message: "You're logged out", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to logout", error: error.message });
  }
};


// special end points : 

export const getSpecificUserAndPost = async (req, res) => {
  const {user_id, PostId} = req.params
  
  
  try {
    const user = await userModel.findAll({
      where : {
        id : user_id
      }
    });

    const post = await postsModel.findAll({
      where : {
        id : PostId,
        Author : user_id
      }
    })
    
    const comments = await commentsModel.findAll({
      where: {
        PostId,
        UserId : user_id
      }
    })


    res.status(200).json({ message: "Done", user : user , UserPost : post , PostComments : comments});
  } catch (error) {
    res.status(500).json({ message: "Failed to get user info", error: error.message });
  }
};