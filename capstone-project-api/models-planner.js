// const {data} = require('./db.json');
const fs = require("fs");
let usersjson = fs.readFileSync('db.json',"utf-8");
let users = JSON.parse(usersjson);
class Planner{
    constructor(){
        this.super();
    }

    static createUser(user){
        let userExist = users.users.find( (actualUser) => (actualUser.name == user.name) && (actualUser.password == user.password))
        if (userExist == undefined){
            users.users.push(user);
            usersjson = JSON.stringify(users);
            fs.writeFileSync("./db.json",usersjson,"utf-8");
            return user
        } else {
            return "Found"
        }
    }

    static getUsers(){
        return users;
    }
}

module.exports = Planner