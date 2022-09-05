const User = require('../model/User')


const handleLogout =  async (req, res) => {
    // delete accessToken on frontend

    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;


    //is refreshTokn in db?
    const foundUser = await User.findOne({refreshToken}).exec()
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true});
        return res.sendStatus(204); //
    }

    // Delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true}) // secure ture - only serves on https
    res.sendStatus(204);


        
}

module.exports.handleLogout = handleLogout;