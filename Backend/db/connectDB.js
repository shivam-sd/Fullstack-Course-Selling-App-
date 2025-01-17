const mongoose = require("mongoose");

function ConnectToDB(){
    mongoose.connect(`mongodb://${process.env.CONNECT_DB}/CoursesHub`).then(() => {
        console.log("Connected TO DB")
    }).catch((err) => {
        console.log(err);
    });
}

module.exports = ConnectToDB;

