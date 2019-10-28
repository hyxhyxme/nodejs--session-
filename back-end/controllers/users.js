const usersModel = require('../models/users')
const tools = require('../utils/tools')

const register = async function(req, res, next) {
  res.set('Content-Type','application/json; charset=utf-8')
  let {account,username,password} = req.body
  
  let hash = await tools.hash(password)
  let result = await usersModel.save({
    account,
    username,
    password:hash
  })

  if(result){
    res.render('succ',{
      data:JSON.stringify({
        message:'用户注册成功'
      })
    })
  }else{
    res.render('fail',{
      data:JSON.stringify({
        message:'用户注册失败'
      })
    })
  }
    
}

const hasAccount = async function(req,res,next){
  res.set('Content-Type','application/json; charset=utf-8')
  let {account} = req.body
  let result = await usersModel.findOne({account})
  if(result){
    res.render('succ',{
      data:JSON.stringify({
        message:'该邮箱号已被注册'
      })
    })
  }else{
    next()
  }
  
}

const login = async function(req,res,next){
  res.set('Content-Type','application/json; charset=utf-8')
  let {account, password} = req.body
  let result = await usersModel.findOne({account})
  if(result){
   let compareResult = await tools.compare(password,result.password)
   if(compareResult){
    req.session.account = account
  
    res.render('succ',{
      data:JSON.stringify({
        message:'登录成功',
        username:result.username,
      })
    })
   }
   else{
    res.render('fail',{
      data:JSON.stringify({
        message:'账号或密码错误'
      })
    })
   }
  }else{
    res.render('fail',{
      data:JSON.stringify({
        message:'账号或密码错误'
      })
    })
  }
}
const isLogin = async function(req,res,next){
  res.set('Content-Type','application/json; charset=utf-8')
  if(req.session.account){
    let account = req.session.account
    let result = await usersModel.findOne({ account })
    res.render('succ',{
      data:JSON.stringify({
        message : '是登录装填',
        account : account,
        username : result.username
      })
    })
  }
  else{
    res.render('fail',{
      data:JSON.stringify({
        message:'不是登录状态,没有权限'
      })
    })
  }
}

const exit = function(req,res,next){
  res.set('Content-Type','application/json; charset=utf-8')
  req.session.account = null
  res.render('succ',{
    data:JSON.stringify({
      message:'退出成功',
    })
  })
}

module.exports = {
    register,
    hasAccount,
    login,
    isLogin,
    exit
}