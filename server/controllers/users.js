const usersModel = require('../models/users');
const policies = require('../middleware/register');
const base64Img = require('base64-img')
const isBase64 = require('is-base64')
const { promisify } = require('util')
const e = require('express');

exports.fillProfile = async (req, res) => {
  try {
    console.log('h')
    var check = policies.checkFillProfile(req.body);
    if (check !== 'OK')
        throw check;
    check = await usersModel.fill(req.body, res);
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
    base64Img.img = promisify(base64Img.img)
    if (!Array.isArray(image) || image.length == 0)
      throw 'please send an array of images !'
    for (let i = 0; i < image.length; i++)
    {
      if (image[i])
      {
        var name = await base64Img.img(image[i], './public', Date.now())
        const pathArr =  name.split('/')
        uImage[j++] = pathArr[pathArr.length - 1]
      }
    }
    j = uImage.length
    while (j < 5)
      uImage[j++] = null
    console.log(uImage)
    const token = await usersModel.uImages(uImage, req.body.info.id)
    res.status(200).json({ success: true, token: token });
  }
  catch (err) {
    res.status(400).send({
      error: err.message || err
    })
  }
}