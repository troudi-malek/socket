const express = require("express");
const router = express.Router();

// Utilisation DE "CONTROLLER"  C
const userController = require("../controller/userController");

// Utilisation de "Middlewear"
const validate = require("../midill/validate");

// Utilisation de "MODEL"  M
const user = require("../modele/user");

// userController(fichier).getbyid (fonction dans Controller)
router.get("/get/:id", userController.getbyid);

// Fonction 1: [READ] --> cette fonction à travers un Controlleur userController(fichier).getall (fonction dans Controller)
router.get("/getall", userController.getall);

// Fonction 4: [Ajout] --> cette fonction à travers un Controlleur et le middleware validate 
                               //(car on a des conditions)
router.post("/new", validate, userController.add);

// Fonction 3: [UPDATE] ---> directement dans la route comme ATELIER 3
router.put("/update/:id", async function (req, res) {
  try {
    
    await user.findByIdAndUpdate(req.params.id, req.body, { new: true });
   
  } catch (err) {
    res.send(err);
  }
});

// Fonction 4: [DELETE]  ---> directement dans la route comme ATELIER 3
router.delete("/delete/:id", async function (req, res) {
  try {
  
    await user.findByIdAndRemove(req.params.id);


  } catch (err) {
    res.send(err);
  }
});


module.exports = router;
