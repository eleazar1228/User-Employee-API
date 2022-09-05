const { json } = require('express')
const { findOne } = require('../model/User')
const User = require('../model/User')


const getAllUsers = async (req, res)  => {

    //allocate all users from user database table
    const allusers = await User.find();

    // If users in database
    if (!allusers)
    {
        return res.json(204).json({"mesage": "No registered users"})
    }

    res.json(allusers)

}


const deleteUser = async (req, res) => {
    //Check if id was inputted
    if (!req?.body?.id)
    {
        return res.status(400).json({"message": "id required to delete"})
    }

    //find user corresponding to id param
    const user = await User.findOne({_id: req.body.id}).exec()

    //Check if user exist
    if (!user)
    {
        return res.status(400).json({"mesage": `No User matches ID ${req.bod.id}`})
    }

    //Delete user from db
    const  result = await User.deleteOne({_id: req.body.id})

    res.json(result)
    
}


module.exports = { getAllUsers, deleteUser }