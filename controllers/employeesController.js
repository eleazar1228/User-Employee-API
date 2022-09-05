const Employee = require('../model/Employee')

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    if (!employees) {
        return res.status(204).json({'message': 'No employees found.'})
    }
    res.json(employees)

}

const createNewEmoployee =  async (req, res) => { //http request for incoming paraemters
    if (!req?.body?.firstname || !req.body?.lastname) {
        return res.status(400).json({ 'message': 'First and last names are required.' });
    }
    
    //const { fs, ls} = req.body;

    //Making sure first and last name are filled
    //if (!fs || !ls) {
      //  return res.status(400).json({ 'message': 'First and last names are required.' });
    //}

    //Add Employee to database
    try {
        const result = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });
        res.status(201).json({result})
    }catch (err){
        console.error(err);
    }    
}
 

const updateEmployee = async (req, res) => { //http for updatating info

    //Check if id field is filled
    if (!req?.body?.id) {
        return res.status(400).json({'message': 'ID paremeter is required.'})
    }
    
    //Find employee with corresponding ID
    const employee = await Employee.findOne({_id: req.body.id}).exec()

    //if employee exist
    if (!employee) {
        return res.status(400).json({ "message": `No employee matches ID ${req.body.id}` }); 
    }

    //update either first or last name
    if (req.body?.firstname) employee.firstname = req.body.firstname; 
    if (req.body?.lastname) employee.lastname = req.body.lastname; 
    const result = await employee.save()
    res.json(result); //transform data into json
}


const deleteEmployee = async (req, res) => { 
    //Check if id field is filled
    if (!req?.body?.id) {
        return res.status(400).json({'message': 'ID paremeter is required.'})
    }

    const employee = await Employee.findOne({_id: req.body.id}).exec()

    //if employee exist
    if (!employee) {
        return res.status(400).json({ "message": `No employee matches ID ${req.body.id}` }); 
    }

    //Delete employee on database
    const result = await employee.deleteOne({_id: req.body.id})

    res.json(result)

    
}


const getEmployee = async (req, res) => {
    //Check if id field is filled
    if (!req?.params?.id) {
        return res.status(400).json({'message': 'ID paremeter is required.'})
    }

    const employee = await Employee.findOne({_id: req.params.id}).exec()

    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.params.id} not found` });
    }


    res.json(employee); //return specific employee
}



module.exports = {
    getAllEmployees,  
    createNewEmoployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}