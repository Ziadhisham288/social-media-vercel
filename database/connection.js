import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("bw31mmy0oa6ucm2wnck5", "u7ov86zvqf09f4qf" , "rmqgWl6EfnpadIPuJUi4" , {
  host: "bw31mmy0oa6ucm2wnck5-mysql.services.clever-cloud.com",
  dialect: "mysql"
})

const connectionDB = async () => {
  return await sequelize.sync({alter: false , force : false }).then(() => {
    console.log("Database connection is successful!")
  }).catch((error) => {
    console.log({Message : "Error" , error})
  }) 
}


export default connectionDB;
