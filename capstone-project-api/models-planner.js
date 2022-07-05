// const {data} = require('./db.json');
const fs = require("fs");

class Planner{
    constructor(){
        this.super();
    }

    static createUser(user){
        let usersjson = fs.readFileSync('db.json',"utf-8");
        let users = JSON.parse(usersjson);
        users.users.push(user);
        usersjson = JSON.stringify(users);
        fs.writeFileSync("./db.json",usersjson,"utf-8");
        return user;
    }

}

module.exports = Planner