const uuid = require('uuid');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

let postSchema = new Schema ({
    id: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String
      , required: true
    },
    author: {
      type: String,
      required: true
    },
    publishDate: {
      type: String,
      required: true
    }
});

// Create instance of database
let Posts = mongoose.model('Posts', postSchema);

const List = {
    get : function(){
        return Posts.find()
            .then(posts => {
                return posts;
            })
            .catch(err => {
                throw new Error(err);
            });
    },

    author : function(Autor){
        return Posts.find({author: Autor})
            .then(post => {
                return post;
            })
            .catch(err => {
                throw new Error(err);
            });
    },

    newPost : function(PostNew){
        return Posts.create(PostNew)
            .then(post => {
                return post;
            })
            .catch(err => {
                throw new Error(err);
            });
    },

    deletePost : function(IDdelete){
        return Posts.deleteOne({_id: IDdelete})
            .then(post => {
                return post;
            })
            .catch(err => {
                throw new Error(err);
            });
    },

    putPost : function(postId, postTitle, postcontent, postAuthor, postDate){
        return Posts.findByIdAndUpdate({_id: postId}, {$set:{title: postTitle, content: postcontent, author: postAuthor, publishDate: postDate}})
            .then(post => {
                return post;
            })
            .catch(err => {
                throw new Error(err);
            });
    }
};

module.exports = {List}
