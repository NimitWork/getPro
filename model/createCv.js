const mongoose = require("mongoose");
const createCv = mongoose.Schema({
    email:String,
    resumeHeadline:Object,
    employer:Array,
    education:Array,
    tableData:Array,
    project:Array,
    desired:Object,
    personal:Object
});

module.exports = mongoose.model("createCv", createCv);
