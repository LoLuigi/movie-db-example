import { readCsvFile, writeCsvFile } from '../lib/csv.js';

class UsersController {
  static async getUser(req, res) {
    let result = {}
    console.log(`UsersReviewsController.postUser`);
    const { useremail } = req.query
    const users = await readCsvFile('/data/users.csv');
    // console.log(users)
    users.map((user)=>{
      if (JSON.stringify(user.email) === JSON.stringify(useremail)){
        result = user;
      }
    })
    console.log(result)
    res.json(result);
    return;
  }

  static async create(req, res){
    console.log("Registration req")
    const users = await readCsvFile('/data/users.csv');
    const { body } = req;
    let unique = true;
    let errorMessage = "New User added"
    users.map((user)=>{
        if (JSON.stringify(user.email) === JSON.stringify(body.email)){
            unique = false
            errorMessage = "Not a new User"
            return;
        };
    });
    if (unique){
        users.push(body);
        await writeCsvFile("/data/users.csv", users);
    };
    // console.log(unique)
    res.json([unique, errorMessage])
    return;
  };

  static async login(req, res){
    console.log("Log in req")
    const users = await readCsvFile('/data/users.csv')
    const { body } = req;
    let login = false;
    // console.log(body);
    let response = "Log in failed"
    users.map((user)=>{
        if (user.email === body.email && user.password === body.password ){
            login = true;
            response = "login was succesfull";
        };
    });
    res.json(login)
    return;
  }
}

export default UsersController;