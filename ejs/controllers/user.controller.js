
const getIndex=(req,res)=>{
    res.render("index")
}
const getSignupPage=(req,res)=>{
res.render("signup")
}


module.exports ={getIndex,getSignupPage}