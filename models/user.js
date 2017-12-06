const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  gitHub: {
    id: String,
    accessToken: String,
    username: String,
    email: String,
    name: String,
    avatarUrl: String,
    location: String,
    apiUrl: String,
    profileUrl: String,
    followersUrl: String,
    reposUrl: String,
    gistsUrl: String,
    publicRepos: Number,
    publicGists: Number,
    hireable: Boolean,
    followers: Number,
    following: Number,
    createdAt: Date,
    updatedAt: Date
	}
})

const User = mongoose.model('User', UserSchema);
module.exports = User;
