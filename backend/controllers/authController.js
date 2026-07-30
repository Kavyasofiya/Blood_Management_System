const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const User=require("../models/userModel");

exports.register=(req,res)=>{

    const {name,email,password}=req.body;

    User.findByEmail(email,(err,result)=>{

        if(result.length>0){

            return res.json({

                success:false,
                message:"Email already exists"

            });

        }

        const hashed=bcrypt.hashSync(password,10);

        User.create({

            name,
            email,
            password:hashed

        },()=>{

            res.json({

                success:true,
                message:"Registration Successful"

            });

        });

    });

};

exports.login = (req, res) => {

    const { email, password } = req.body;

    User.findByEmail(email, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database Error"
            });
        }

        if (result.length === 0) {
            return res.json({
                success: false,
                message: "Invalid Email"
            });
        }

        const user = result[0];

        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            success: true,
            token,
            name: user.name,
            message: "Login Successful"
        });

    });

};