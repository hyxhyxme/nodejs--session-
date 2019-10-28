const mongoose = require('Mongoose')
//端口后面是数据库的名字，若数据库中不存在则重新创建
mongoose.connect('mongodb://localhost:27017/hyx', {useUnifiedTopology:true,useNewUrlParser: true})
//users是集合，往集合中插入数据
const Users = mongoose.model('users',{
    account : String,
    username : String,
    password : String 
})

module.exports = {
    Users
}