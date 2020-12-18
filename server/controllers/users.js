const usersModel = require('../models/users');
const policies = require('../middleware/register');
const base64Img = require('base64-img')
const fs = require('fs')
const { promisify } = require('util')
const e = require('express');

exports.updateProfile = async (req, res, next) => {
  console.log("update profile : ---> controller");
  try {
    var check = policies.checkUpdateProfile(req.body);
    if (check !== 'OK')
    throw check;
    console.log("update profile : ---> controller");
    await usersModel.fill(req.body, res);
    if (!check)
      throw 'something went wrong'
    res.status(200).json({ success: true, msg: "Account completed successfully !" });
  }
  catch (err) {
    res.status(400).send({
      error: err
    });
  }
};

exports.fillProfile = async (req, res) => {
  try {
    // console.log('h')
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
    await usersModel.location(req.body)
  }
  catch (err) {
    res.status(400).send({
      error: err
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
    // console.log(req.params.login)
    var id = await usersModel.getId(req.params.login)
    // console.log(id)
    if (!id)
      throw "invalide login !"
    var user = await usersModel.getOtherUserInfo(id, req.params.login)

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