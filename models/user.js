const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowingCount = new Schema({
  date: { type: Date, default: Date.now },
  followingCount: Number
})

const FollowerCount = new Schema({
  date: { type: Date, default: Date.now },
  followerCount: Number
})

const LanguageBreakdown = new Schema({
  date: { type: Date, default: Date.now },
  languageCounts: {},
  repoTotal: Number
})

const UserSchema = new Schema({
  gitHub: {
    id: String,
    accessToken: String,
    username: String,
    email: String,
	},
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
  followerCounts: [FollowerCount],
  followingCounts: [FollowingCount],
  languageBreakdowns: [LanguageBreakdown],
  createdAt: Date,
  updatedAt: Date
})

const User = mongoose.model('User', UserSchema);
module.exports = User;
