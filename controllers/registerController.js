const User = require('../model/User')

const bcrypt = require('bcrypt'); 

const handleNewUser = async (req, res) => {
    const { user, pwd, roles} = req.body; //capture credentials from http req
    if (!user || !pwd) return res.status(400).json({'message': 'Username and password are required'})
    console.log(roles)

    // check for duplicate usernames in db
    const duplicate = await User.findOne({username: user}).exec(); //use exec() when using async funcs
    
    if (duplicate) return res.sendStatus(409) //Conflict
    try {
        //encrypt the passsword
        const hashedPWd = await bcrypt.hash(pwd, 10)

        //Create and store the new user
        const result = await User.create({ 
            "username": user, 
            "roles" : roles,
            "password": hashedPWd, 
            //"roles" : roles
        });
        //await result.save()

        //let result2 = new User({
          //  username: user,
            //password: hashedPWd
        //})
        console.log(result);
        //console.log(`${u} has been added`)
        //await result2.save().then(() => res.status(201).json({'success': `New user ${user} created`}))

        //Second Option
        /*const newUser = new User();
        newUser.username = user;
        newUser.password = hashedPWd;
        const result = await newUser.save();*/



        //console.log(result);
        
        res.status(201).json({'success': `New user ${user} created`})
    } catch (err) {
        res.status(500).json({'message': err.message});
    }
}

module.exports.handleNewUser =  handleNewUser 