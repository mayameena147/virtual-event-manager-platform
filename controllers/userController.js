const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
    const body = req.body;
    if(body.name && body.password && body.email && body.role){
        const newUser = new User();
        newUser.name = body.name;
        newUser.password = bcrypt.hashSync(body.password, 10);
        newUser.role = body.role;
        newUser.email = body.email;

        await newUser.save();
        res.status(200).send({message: "User registered successfully"});      
    }
    else {
         res.status(400).send({error: "Please provide all details"});
    }
}

async function loginUser(req, res) {

    const body = req.body;
    if(body.email && body.password){
        const user = await User.findOne({ email: body.email});
        console.log("body: " + body.email);
        console.log("user details: " + user);
        if(user) {
            const match = bcrypt.compareSync(body.password, user.password);
            if (match) {
               const token = jwt.sign({ name: user.name }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
                res.status(200).send({message: "login successful", token: token}); 
            }
            res.status(401).send({error: "Invalid credentials"});  
        } else {
            res.status(404).send({message: "Please register"});
        }
    }
    else {
        res.status(400).send({message: "Please provide all inputs"});   
    }    
}

module.exports = {registerUser, loginUser}