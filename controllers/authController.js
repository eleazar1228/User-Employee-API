const User = require('../model/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const handlelogin = async (req, res) => {
    const { user, pwd } = req.body; //capture credentials from http req
    if (!user || !pwd) return res.status(400).json({'message': 'Username and password are required'})

    //find user in db corrsoponding to req
    const foundUser = await User.findOne({username: user}).exec(); //use exec() when using async funcs
    if (!foundUser) return res.sendStatus(401); //Unathorized

    //evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password)
    if (match) {
        const  roles = Object.values(foundUser.roles)
        //crearte JWTs
        const accessToken = jwt.sign(
            {"UserInfo": {
                "username": foundUser.username,
                "roles": roles
                } 
            },
            process.env.ACCESS_TOKEN_SECRET, // access secret token
            { expiresIn: '60s'} //optional expiration

        )
        const refreshToken = jwt.sign(
            {"username": foundUser.username}, //pass Username
            process.env.REFRESH_TOKEN_SECRET, // access refresh token
            { expiresIn: '1d'} //optional expiration

        )
        // Saving refreshToken to database
        foundUser.refreshToken = refreshToken
        const result = await foundUser.save();
        console.log(result)

        res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000}); //secure: true
        res.json({ accessToken })
    } else {
        res.sendStatus(401)
    }
}

module.exports.handlelogin = handlelogin;