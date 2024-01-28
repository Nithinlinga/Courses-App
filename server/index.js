const express=require('express');
const jwt=require('jsonwebtoken');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();
app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());
const SECRET='secrEt';

//create Schema
const userSchema=new mongoose.Schema({
    username:String, 
    password:String,
    purchasedCourses:[{type: mongoose.Schema.Types.ObjectId, ref:'Course'}]
});
const adminSchema=new mongoose.Schema({
    username: String, 
    password: String
});
const courseSchema=new mongoose.Schema({
    title : String,
    description: String,
    price: Number,
    image: String, 
    published: Boolean
})

//create models
const User=new mongoose.model('User',userSchema)
const Admin=new mongoose.model('Admin',adminSchema);
const Course=new mongoose.model('Course',courseSchema)

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        } 
        req.user = user;
        next(); 
      });
    } else {
      res.sendStatus(401); 
    }
  };
  mongoose.connect('mongodb://nithinlinga2:GIomF33qB0K0QvJB@ac-rpkoumj-shard-00-00.rala7ic.mongodb.net:27017,ac-rpkoumj-shard-00-01.rala7ic.mongodb.net:27017,ac-rpkoumj-shard-00-02.rala7ic.mongodb.net:27017/?replicaSet=atlas-nru2xu-shard-0&ssl=true&authSource=admin',{dbName:"Courses"});
app.post('/admin/signup',async (req,res)=>{
    const {username,password}=req.body;
    const admin=await Admin.findOne({username});
    if(admin){
        res.status(404).json({message:"Admin already exists"})
    }
    else{
        const newAdmin=new Admin({username,password});
        await newAdmin.save();
        const token=jwt.sign({username,role:'admin'},SECRET,{expiresIn:'1hr'});
        res.json({message:"Admin created successfully",token});
    }

})
app.post('/admin/login',async (req,res)=>{
    const {username,password}=req.headers;
    const admin=await Admin.findOne({username,password});
    if(admin){
        const token=jwt.sign({username,role:'admin'},SECRET,{expiresIn:'1hr'});
        res.json({message:"Login successful",token});
    }
    else{
        res.status(403).json({message:"Invalid Admin Credentials"});
    }

}) 
app.post('/admin/addcourse',authenticateJwt,async (req,res)=>{
    const title=req.body.title
    const isExist=await Course.findOne({title});
    if(isExist){
        res.status(403).json({message:"Course ALready Exists"})
    }
    else{ 
    const course=new Course(req.body);
    await course.save();
    res.json({message:"Course created succesfully",courseId:course.id});
    }

})
// app.get('admin/courses',authenticateJwt,async(req,res)=>{
//         const courses=await Course.find({});
        
//             res.json({courses});
        
// })
app.listen(3000,()=>{
    console.log("App listening on port 3001")
}) 
 