import token from '../services/token';
import User from '../models/user';

export default {
    signup : (req, res, next) => {
        const {
          email,
          password,
          ethAddr
        } = req.body;
        
        
        if(!email)
        {
            
        return res.status(422).send({error:"no EMAIL"})
        }
        if (!email || !password||!ethAddr) {
            return res
                .status(422)
                .send({error: 'You must provide email , password and ethAddr'});
        }
        User
            .findOne({
                email: req.body.email
            }, function (err, existingUser) {
                if (err) return res.status(422).send(err);
                if (existingUser) {
                    return res
                        .status(422)
                        .send({error: 'Email is in use'});
                }
                const user = new User({
                  email: req.body.email,
                  password: password,
                  ethAddr: ethAddr
                });
                
                console.log("after created user");
                console.log(user);
                
                user.save(function (err, savedUser) {
                    if (err) {
                        
                        return next(err)
                    }
    
                    res.json({
                        success: true,
                        token: token.generateToken(savedUser)
                    })
                })
            })
    },
    
    signin: (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            return res
                .status(422)
                .send({error: 'You must provide email and password.'});
        }
        User
            .findOne({
                email: email
            }, function (err, existingUser) {
                if (err || !existingUser) {
                    return res.status(401).send(err || {error: "User Not Found"})
                }
                if (existingUser) {
                    existingUser.comparedPassword(password, function(err, good) {
                        if (err || !good) {
                                return res.status(401).send(err || 'User not found')
                            }
    
                            res.send({
                                token: token.generateToken(existingUser)
                            })
                    })
                }
            })
    },

    updateProfile: (req, res, next) => {

        if (!emailVerified) {
          return res
            .status(422)
            .send({ error: "Email Not verified" });
        }
        req.user.comparedPassword(req.body.password, (err, good) => {
            if (err || !good) return res.status(401).send(err || 'Incorrect Password')
            const userId = req.user._id;
            const newProfile = {
                email: req.body.email
                 
            };
            delete newProfile.email;
            delete newProfile.password;

            
            User.findByIdAndUpdate(userId, newProfile, {new: true})
            .then(newUser=>{
                res.sendStatus(200);
            })
            .catch(next)
        })
    }
    
}
