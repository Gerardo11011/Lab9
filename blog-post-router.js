const express = require('express');
const router = express.Router();
const {List} = require('./blog-post-model');
const uuid = require('uuid');

// GET method route
router.get('/blog-posts', (req, res, next) => {
    List.get()
        .then(posts => {
            res.status(200).json({
                message: "Succes",
                status: 200,
                posts: posts
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Internal server error.",
                status: 500
            });
            return next();
        });
});

// GET method route
router.get('/blog-posts/:author', (req, res, next) =>{
    const Author = req.params.author;

    List.author(Author)
			.then(posts => {
				res.status(200).json({
  					message : "Author Post Sent.",
					status : 200,
					posts : posts
				});
			})
			.catch(err => {
				res.status(404).json({
					message : "Author Not Found",
					status : 404
				});
				return next();
			});
});

// POST method route
router.post('/blog-posts', (req, res, next) => {
    let requiredFields = ['title', 'content', 'author', 'publishDate'];

    for (let i = 0; i < requiredFields.length; i++){
        let currentField = requiredFields[i];
        if(!(currentField in req.body)){
            res.status(406).json({
                message : `Missing fields`,
                status : 406
            });
            return next();
        }
    }
    const titlenew = req.body.title;
    const contentnew = req.body.content;
    const Authornew = req.body.author;
    const datenew = req.body.publishDate;
    const idnew = uuid.v4();

    let agregate  = {
        id: idnew,
        title: titlenew,
        content: contentnew,
        author: Authornew,
        publishDate: datenew
    };

    List.newPost(agregate)
        .then(post => {
            res.status(201).json({
                message : "Post Added",
                status : 201,
                post : post
            });
        })
        .catch(err => {
            res.status(500).json({
                message : `Internal server error.`,
                status : 500
            });
            return next();
        });

});


router.delete('/blog-posts/:id', (req, res, next) => {
    let paramId = req.params.id;

    List.deletePost(paramId)
		.then(post => {
			res.status(200).json({
				message : "Post Delete",
				status : 200,
				post : post
			});
		})
		.catch(err => {
			res.status(404).json({
				message : "Not Found",
				status : 404
			});
			return next();
		});

});


router.put('/blog-posts/:id', (req, res) => {
  let postId = req.params.id;
   let update = req.body;

   List.putPost(postId, update.title, update.content, update.author, update.publishDate)
       .then(post => {
           res.status(200).json({
               message : "Updated Post",
               status : 200,
               post : post
           });
       })
       .catch(err => {
           res.status(404).json({
               message : "Post Not found",
               status : 404
           });
           return next();
});

});


module.exports = router;
