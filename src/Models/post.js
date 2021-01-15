const mongoose = require('mongoose');

const post = new mongoose.Schema ({
    username: {
        required: true,
        type: String
    },

    info: {
        required: true,
        type: String
    },

    comments: {
        required: true,
        type: Array
    }

}

);
module.exports = Post = mongoose.model("posts", post);