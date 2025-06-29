import mongoose from "mongoose";

const connection = () =>{

mongoose.connect("mongodb+srv://rahulkumawat6767:Ap33ZldXHDFkUM5Q@cluster0.plksjuh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

.then(()=>{
    console.log("Database sucessfully connected!")
    
})
.catch((err)=>{
    console.log("error in connecting DataBase",err)
})


}

// mongodb+srv://hr:3F0pNsvjlJhDGpXe@cluster0.uxqk6c8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

export default connection
