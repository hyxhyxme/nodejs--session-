import SMERouter from 'sme-router'
import { home } from '../controllers/home'
import * as position from '../controllers/position'

const router = new SMERouter('row')

router.use((req)=>{
    let url = req.url.slice(1)
    $(`a[data-url]`).removeClass('active')
    $(`a[data-url=${url}]`).addClass('active')
})

router.route('/home',home)
router.route('/position',position.list)
router.route('*',(req,res,next)=>{
    res.redirect('/home')
})