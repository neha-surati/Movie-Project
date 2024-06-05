const {Router}=require("express");
const { home,addMovie,add_movie, uploadImage, deletemovie, editmovie, updatemovie }=require("../controllers/movie_controller")
const router= Router();



router.get("/",home);
router.get("/add_movie", add_movie);
router.get("/deletemovie", deletemovie);
router.get("/editmovie",editmovie);



router.post("/addMovie",uploadImage, addMovie);
router.post("/updatemovie",uploadImage,updatemovie)

module.exports=router;