import { readCsvFile, writeCsvFile } from '../lib/csv.js';

class UsersController {
  static async getUser(req, res) {
    let result = {}
    console.log(`UsersReviewsController.postUser`);
    const { useremail } = req.query
    const users = await readCsvFile('/data/users.csv');
    users.map((user)=>{
      if (JSON.stringify(user.email) === JSON.stringify(useremail)){
        result = user;
        console.log("User found");
      }
    })
    res.json(result);
    return;
  }

  static async create(req, res){
    console.log("Registration req")
    const users = await readCsvFile('/data/users.csv');
    const { body } = req;
    let unique = true;
    let errorMessage = "New User added"
    if (JSON.stringify(body).includes(`""`) || !JSON.stringify(body.email).includes("@") || !JSON.stringify(body.age).includes(".",".")){
      console.log("Not full");
      console.log("Emptyfield")
      unique = false
      body.email = null
    }
    users.map((user)=>{
        if (unique && JSON.stringify(user.email) === JSON.stringify(body.email)){
            unique = false
            body.email = null
            errorMessage = "Not a new User"
            return;
        };
    });
    if (unique){
        users.push(body);
        // console.log(users)
        await writeCsvFile("/data/users.csv", users);
    };
    // console.log(unique)
    res.json(body.email)
    return;
  };

  static async login(req, res){
    console.log("Log in req")
    const users = await readCsvFile('/data/users.csv')
    const { body } = req;
    let login = false;
    let response = "Log in failed"
    if  (body.email.length !== 0 && body.password.length !== 0)
      {users.forEach((user)=>{
        if (user.email === body.email && user.password === body.password){
          console.log("Login succesfull");
            login = true;
          }
      })};
      if (!login){
        body.email=null
        console.log("Login failed");
      }
    res.json(body.email)
    return;
  }

  static async edit(req, res){
    console.log("Edit req")
    const users = await readCsvFile('/data/users.csv')
    const { body } = req;
    const user = users.find((user)=>{
      return user.email === body.email
    })
    var index = users.indexOf(user);
    if (index > -1) {
      users.splice(index, 1);
    }
    users.push(body);
    await writeCsvFile("/data/users.csv", users);
    // console.log(users)
    res.json(body.email)
    return;
  }
}

export default UsersController;