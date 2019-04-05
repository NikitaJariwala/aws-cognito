const {RegisterUser,LoginUser,confirmSignup,authenticateUser,ValidateToken} = require('../configs/aws_cognito');

const {Router} = require('express');
const router = Router();

router.post('/register', (req, res) => {
    return RegisterUser(req.body,(err, result) => {
        if (err) {
            return res.status(400).json(err);
        }
        else {
            return res.json(result).status(200);
        }
    });
});

router.post('/login', (req, res) => {
    return LoginUser(req.body,(err, result) => {
        if (err) {
            return res.status(400).json(err);
        }
        else {
            return res.json(result).status(200);
        }
    });
});

router.post('/confirmation', (req, res) => {
    return confirmSignup(req,(err, result) => {
        if (err) {
            return res.status(400).json(err);
        }
        else {
            return res.json(result).status(200);
        }
    });
});

// router.post('/authenticate', (req, res) => {
//     return authenticateUser(req.body,(err, result) => {
//         if (err) {
//             return res.status(400).json(err);
//         }
//         else {
//             return res.json(result).status(200);
//         }
//     });
// });

router.post('/validatetoken', (req, res) => {
    return ValidateToken(req.body,(err, result) => {
        if (err) {
            return res.status(400).json(err);
        }
        else {
            return res.json(result).status(200);
        }
    });
});


module.exports = router;
