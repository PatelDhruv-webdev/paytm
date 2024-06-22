const express = require('express')
const jwt = require('jsonwebtoken')
const { JWT_TOKEN }  = require('../config')
const zod = require('zod');
const {User} = require('../db')
const{authMiddleware} =require('../middleware')

const route = express.Router();



const signupBody  = zod.object({
    username :zod.string(),
    password : zod.string(),
    firstName : zod.string(),
    password :zod.string()
})

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})


route.post('/signup', async (res,req)=>{
    const body = req.body 
    const {success} =  signupBody .safeParse(req.body)

    if(!success){
        return req.json({
                message : "invalid input "
        })
    }
     const existingUser = User.findOne({
         username : body.username
     })

     if(existingUser){
         return req.json ({
             message : "user already exists"
             })
             
            }
             
             
     const user = await User.create({
        username: req.body.username,
           password: req.body.password,
          firstName: req.body.firstName,
            lastName: req.body.lastName,
            })

      const userId  = user._id 
      const token  = jwt.sign({userId}, JWT_TOKEN)

       res.json({
        message: "User created successfully",
        token: token
    })  

    })


// route.post ('./singin', async (req,res) =>{

    
//     const {success} = signinBody.safeParse(req.body)

//     if(!success){
//         return req.json({
//                 message : "invalid input "
//         })
//     }

//   const user = await User.findOne({
//     username: req.body.username,
//     password :req.body.password
//   })
//    if(user) {
//      const token =jwt.sign({
//         userId : user_id
//      } , JWT_TOKEN)

//      res.json({
//         token : token
//      })

//    }
//    return;

//    res.status(411).json({
//     message: "Error while logging in"
// })

// })



route.put('/',authMiddleware, async (res,req)=>{
    const {success} = updateBody.safeParse(req.body )
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }
   await User.updateOne({ _id: req.userId }, req.body);

   res.json({
    message: "Updated successfully"
})

})



route.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports = route;