export default  {
    get({url,type = 'GET',data={}}){
        return $.ajax({
            url,
            data,
            type
        })
    }
}