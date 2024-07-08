import userModel from "../../../database/models/usersModel.js"


export const validateEmail = async (req, res , next) => {
  const {email} = req.body

  const user = await userModel.findOne({
    where : {
      email
    }
  }) 

  if(email == user?.email) {
    return res.json({message : "Account already exists, Login instead?"})
  }

  next()
}