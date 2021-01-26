const usersModel = require('../models/users');
const policies = require('../middleware/register');
const upPolicies = require('../middleware/updateProfile');
const base64Img = require('base64-img')
const fs = require('fs')
const { promisify, isNumber } = require('util')
const e = require('express');

exports.updateProfile = async (req, res, next) => {
  try {
    var update = req.body.info;
    var check = upPolicies.checkUpdateProfile(update);
    if (check !== 'OK')
    throw check;
    await usersModel.updateProfileRequest(update, res);
      res.status(200).json({ success: true, msg: "Profile updated successfully !" });
  }
  catch (err) {
    res.status(400).send({
      error: err.message || err
    });
  }
};
exports.updateProfileEmail = async (req, res, next) => {
  try {
    var update = req.body.info;
    var check = upPolicies.checkMailUpdate(update.email);
    if (check !== 'OK')
    throw check;
    await usersModel.updateProfileEmailRequest(update, res);
      res.status(200).json({ success: true, msg: "Email updated successfully !" });
  }
  catch (err) {
    res.status(400).send({
      error: err.message || err
    });
  }
};
exports.updateProfileBio = async (req, res, next) => {
  try {
    var updates = req.body.info;
    var check = upPolicies.checkBioUpdate(updates.bio);
    if (check !== 'OK')
    throw check;
    await usersModel.updateProfileBioRequest(updates, res);
      res.status(200).json({ success: true, msg: "Bio updated successfully !" });
  }
  catch (err) {
    res.status(400).send({
      error: err.message || err
    });
  }
};

exports.updateProfileTags = async (req, res, next) => {
 
  try {
    var info = req.body.info;
    var check = upPolicies.checkTagsUpdate(info.chips);
    if (check !== 'OK')
        throw check;
    await usersModel.updateProfileTagsRequest(info, res);
    res.status(200).json({ success: true, msg: "Tags updated successfully !" });
  }
  catch (err) {
    console.log("Error");
    res.status(400).send({
      error: err.message || err
    });
  }
};

exports.updateProfilePassword = async (req, res, next) => {
  try {
    var updates = req.body.info;
    await usersModel.updatePasswordRequest(updates, res);
    res.status(200).json({ success: true, msg: "Password Changed successfully !" });
  }
  catch (err) {
    res.status(400).send({
      error: err.message || err
    });
  }
};

exports.fillProfile = async (req, res) => {
  try {
    var check = policies.checkFillProfile(req.body);
    if (check !== 'OK')
        throw check;
    await usersModel.fill(req.body, res);
    res.status(200).json({ success: true, msg: "Account completed successfully !" });
  }
  catch (err) {
    res.status(400).send({
      error: err.message || err
    });
  }
};

exports.location = async (req, res) => {
  try {
    if (!req.body.location || !req.body.location.city || !req.body.location.lat || !req.body.location.lng || !req.body.info.login)
      throw "send all location !"
    await usersModel.location(req.body)
  }
  catch (err) {
    res.status(400).send({
      error: err || err.message
    })
  }
}

exports.uploadImg = async (req, res) => {
  try {
    const image = req.body.image
    var uImage = []
    let j = 0
    var spl = []
    var path = ''
    base64Img.img = promisify(base64Img.img)
    fs.accessSync = promisify(fs.accessSync)
    if (!Array.isArray(image) || image.length == 0)
      throw 'please send an array of images !'
    for (let i = 0; i < image.length; i++)
    {
      if (image[i])
      {
        spl = image[i].split('/')
        if (spl[0] == "http:" && spl[2] == "localhost:5000") {
          path = "./public/" + spl[3]
          if (fs.accessSync(path, fs.F_OK)) {
            uImage[j++] = spl[3]
          }
        }
        else {
          var name = await base64Img.img(image[i], './public', Date.now())
          const pathArr =  name.split('/')
          uImage[j++] = pathArr[pathArr.length - 1]

        }
      }
    }
    j = uImage.length
    while (j < 5)
      uImage[j++] = null
    await usersModel.uImages(uImage, req.body.info.id)
    res.status(200).json({ success: true});
  }
  catch (err) {
    res.status(400).send({
      error: err.message || err
    })
  }
}

exports.getSeenLiked = async (req, res) => {
  try {
    req.params.id = parseInt(req.params.id)
    if (!req.params.id)
      throw "invalide id !"
    var login = await usersModel.getLogin(req.params.id)
    var seen = await usersModel.getSeen(login)
    var liked = await usersModel.getLiked(login)
    var users = {liked, seen}

    res.status(200).send(users);
  }
  catch (err) {
    res.status(400).send({
      error: err.message || err
    })
  }
}

exports.getUserInfo = async (req, res) => {
  try {
    var user = await usersModel.getUserInfo(req.params.id)

    if (!user)
      throw "invalide id !"
    user.password = undefined
    res.status(200).send({ success: true, user: user});
  }
  catch (err) {
    res.status(400).send({
      error: err.message || err
    })
  }
}

exports.getOtherUserInfo = async (req, res) => {
  try {
    var id = await usersModel.getId(req.params.login)
    var login = await usersModel.getLogin(req.params.id)
    if (!id)
      throw "invalide login !"
    var user = await usersModel.getOtherUserInfo(id, req.params.login, login)

    if (!user)
      throw "invalide id !"
    user.password = undefined
    user.email = undefined
    res.status(200).send({ success: true, user: user});
  }
  catch (err) {
    res.status(400).send({
      error: err.message || err
    })
  }
}