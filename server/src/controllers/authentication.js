import token from "../services/token";
import User from "../models/user";

export default {
  signup: (req, res, next) => {
    var { email, password, ethAddr1, ethAddr } = req.body;
    if (!ethAddr1) {
      ethAddr1 = ethAddr;
    }
    if (!email || !password) {
      return res
        .status(422)
        .send({ error: "You must provide email , password" });
    }
    User.findOne(
      {
        email: req.body.email
      },
      function(err, existingUser) {
        if (err) return res.status(422).send(err);
        if (existingUser) {
          return res.status(422).send({ error: "Email is in use" });
        }
        const user = new User({
          email: req.body.email,
          password: password,
          ethAddr: ethAddr1
        });

        user.save(function(err, savedUser) {
          if (err) {
            return next(err);
          }
          res.json({
            success: true,
            token: token.generateToken(savedUser)
          });
        });
      }
    );
  },

  signin: (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res
        .status(422)
        .send({ error: "You must provide email and password." });
    }
    User.findOne(
      {
        email: email
      },
      function(err, existingUser) {
        if (err || !existingUser) {
          return res.status(401).send(err || { error: "User Not Found" });
        }
        if (existingUser) {
          existingUser.comparedPassword(password, function(err, good) {
            if (err || !good) {
              return res.status(401).send(err || {error:"Wrong Password"});
            }

            res.send({
              token: token.generateToken(existingUser)
            });
          });
        }
      }
    );
  },

  updateProfile: (req, res, next) => {
    req.user.comparedPassword(req.body.password, (err, good) => {
      if (err || !good)
        return res.status(401).send(err || "Incorrect Password");
      const userId = req.user._id;
     

      const newProfile = {
        ethAddr: req.body.ethAddr,
        email: req.body.email
      };

      User.findByIdAndUpdate(userId, newProfile, { new: true })
        .then(newUser => {
          res.sendStatus(200);
        })
        .catch(next);
    });
  }
};
