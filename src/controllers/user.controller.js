import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import connection from "../config/database.js";
dotenv.config();
const register = async (req, res) => {
  try {
    const data = req.body;
    if (!data.username || !data.password) {
      return res.status(500).json({
        success: false,
        message: "Missing required parameters!",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(data.password, salt);
    console.log(hashPassword, data.password, data.username);
    await connection.query(
      "insert into user (username, password) values (?,?)",
      [data.username, hashPassword]
    );
    return res.status(200).json({
      success: true,
      message: "User is created",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const data = req.body;
    if (!data.username || !data.password) {
      return res.status(500).json({
        success: false,
        message: "Missing required parameters!",
      });
    }
    const user = await connection.query(
      "select * from user where username = ?",
      [data.username]
    );
    if (user.length === 0) {
      return res.status(500).json({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(data.password, user[0][0].password);
    if (!isMatch) {
      return res.status(500).json({
        success: false,
        message: "Password is incorrect",
      });
    }
    const userToResponse = await connection.query(
      "select * from user where username = ?",
      [data.username]
    );
    return res.status(200).json({
      success: true,
      message: "Login successfully",
      user: {
        id: userToResponse[0][0].id,
        username: userToResponse[0][0].username,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { register, login };
