const mongoose= require("mongoose");

const database= async()=>{
   try {
    await mongoose.connect("mongodb+srv://nehasurati1605:nehashish@myfreecluster.tbrc3.mongodb.net/?retryWrites=true&w=majority&appName=MyFreeCluster");
    console.log("Database connected..!")
   } catch (error) {
    console.log(error);
   }
}
module.exports= database