const e = require("express");
const bcrypt = require("bcrypt");
const profileList = [];
const jwt = require("jsonwebtoken");
exports.profile = () => {
  return profileList;
}
exports.checkingEmail = (email) => {
  var result = false;
  profileList.forEach(element => {
    if (element.email.localeCompare(email) == 0) {
      result = true;
    }
  });
  return result;
}

exports.register = async (username, email, password) => {
  const passwordHash = await bcrypt.hash(password, 10);
  profileList.push({ username: username, email: email, password: passwordHash });
  return { username: username, email: email, password: passwordHash };
}

exports.checkingPassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
}

exports.findByUsername = async (username) => {
  var result = null;
  profileList.forEach(element => {
    if (element.username.localeCompare(username) == 0) {
      result = element;
    }
  });
  return result;
}

exports.createAccessToken = ({ username, email }) => {
  return jwt.sign({ username, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFE });
}