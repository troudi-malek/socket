const express = require("express");

const user = require("../modele/user");

// la rcherche de tous les utilisateurs
async function getall(req, res) {
  try {
   
    const data = await user.find();
    res.send(data);
  } catch (err) {
    res.send(err);
  }
}

// la recherche par id
async function getbyid(req, res) {
  try {

    const data = await user.findById(req.params.id);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
}

// l'ajout d'un utilisateur
async function add(req, res, next) {
  try {
  
    const User = new user(req.body);
    await User.save();
    res.status(200).send("add success");
  } catch (err) {
    res.status(400).send({ error: error.toString() });
  }
}

module.exports = { getall, getbyid , add };
