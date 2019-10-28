import positionView from '../views/position.art'
import httpModel from '../models/http'

export const list = async (req,res,next)=>{
    let result = await httpModel.get({
        url:'/api/users/isLogin'
    })
    res.render(positionView({
        data : result.ret
    }))
}