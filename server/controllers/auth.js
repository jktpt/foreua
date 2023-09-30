import {db} from "../db.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secret = "nano-login";

export const register = (req, res) => {
    //CHECK EXISTING USER
    const q = "SELECT * FROM cu_backend_user WHERE user_username = ?";
  
    db.query(q, [req.body.username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("User already exists!");
  
      //Hash the password and create a user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
  
      const q = "INSERT INTO cu_backend_user(`user_username`,`user_password`) VALUES (?)";
      const values = [req.body.username, hash];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User has been created.");
      });
    });
  };

export const login = (req,res)=>{
  //CHECK USER

  const q = "SELECT * FROM cu_backend_user WHERE user_username = ?";

  db.query(q, [req.body.username], (err, data , result) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");
    // console.log(req.body.username);
    bcrypt.compare(req.body.password, data[0].user_password, function (err, isLogin) {
      if (isLogin) {
        var token = jwt.sign({ username: data[0].user_username }, secret, {
          expiresIn: "1h",
        });
        res.json({ status: "ok", message: "login success", token });
      } else {
        console.log();
        res.json({ status: "error", message: result });
      }
    });


    //Check password
    // const isPasswordCorrect = bcrypt.compareSync(
    //   req.body.password,
    //   data[0].user_password
    // );

    // if (!isPasswordCorrect)
    //   return res.status(400).json("Wrong username or password!");

    // const token = jwt.sign({ id: data[0].user_id }, "jwtkey",{expiresIn:"1h"});
    // const { password, ...other } = data[0];
      
    // res
    // .cookie("access_token", token)
    // .status(200)
    // .json({ status: "ok", message: "login success", token });
  });
}

export const logout = (req,res)=>{
  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true
  }).status(200).json("User has been logged out.")
}

export const authen = (req,res)=>{
  try {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, secret);
    res.json({ status: "ok", decoded });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
}