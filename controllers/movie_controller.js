const multer = require('multer');
const movieSchema = require('../models/schema');
const fs = require('fs');
const { error } = require('console');


let movieId;

const strorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/image')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },

})
const uploadImage = multer({ storage: strorage }).single('image')

const home = async (req, res) => {
    try {
        let data = await movieSchema.find();
        return res.render("index", { movieData: data });
    } catch (error) {
        console.log(error);
    }
};

const addMovie = async (req, res) => {
    const image = req.file.path;
    try {
        let data = await movieSchema.create({ ...req.body, image });
        console.log(data);
        return res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}
const deletemovie = async (req, res) => {
    let { id } = req.query;
    try {
        let data = await movieSchema
            .findByIdAndDelete(id)
            .then((singleRecode) => {
                fs.unlinkSync(singleRecode.image);
                return res.redirect("/");
            })
            .catch((error) => {
                console.log(error);
            });
    } catch (error) {
        console.log(error);
    }
};

const editmovie = async (req, res) => {
    let { id } = req.query;
    movieId = id;
    try {
        let data = await movieSchema.findById(id);
        return res.render("editMovie", { movieData: data });
    } catch (error) {
        console.log(error);
    }
};

const updatemovie = async (req, res) => {
    if (req.file) {
        movieSchema.findById(movieId).then((result) => {
            fs.unlinkSync(result.image)
        }).catch((err) => {
            console.log(error);
        });

        let image = req.file.path
        try {
            let data = await movieSchema.findByIdAndUpdate(movieId, { ...req.body, image })
            return res.redirect('/')
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            let data = await movieSchema.findByIdAndUpdate(movieId, req.body)
            return res.redirect('/')
        } catch (error) {
            console.log(error);
        }

    }

};






const add_movie = async (req, res) => {
    return res.render("addMovie");
};

module.exports = { home, addMovie, add_movie, uploadImage, deletemovie, editmovie, updatemovie }
