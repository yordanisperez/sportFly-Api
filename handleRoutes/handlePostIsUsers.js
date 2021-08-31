const user=require('../crud/users');
const utils=require('../utils/utils')
const TIMEOUT=10000;
    /*===================================
      =Handle new User:Res send obj json= 
      ={_id:id_user,name:username}      =
      ===================================*/
      function handlePostIsUsers(req,res,next){
        console.log("Manipulador de petición 'handlePostIsUsers' fue llamado. ",req.body);
        const email=req.body.email;
        const sub=req.body.sub;
        const name=req.body.name;
        try{
            let t=setTimeout(()=>
            {
              next({ message: "timeout" });
            },TIMEOUT);
            user.getUserForEmail(email,(error,data)=>{
                clearTimeout(t);
               
 
                if (error){
                  console.log("error: ", error);
                  return next(error);
                }
                if (data){//Ya existe ese usuario en la base de datos
                    const tokenObject = utils.issueJWT(data);
                    res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
                   
                }
                else
                {//Agregamos el ussuario
                     t=setTimeout(()=>
                    {
                      next({ message: "timeout" });
                    },TIMEOUT);
                    user.createNewUser({ name:name,sub:sub,email:email},(error,data)=>{
                        clearTimeout(t);
                        if (error){
                            return next(error);
                        }
                        console.log('User add User added successfully : ',data);
                        
                        const tokenObject = utils.issueJWT(data);
                        res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
                       });
                }
            })

    
        }catch(error){
            console.log('manejado handlePostUsers',error);
     
        }
        
    }


    function createAsociado(req,res,next){
        res.status(404).json({success:false, msg:"Esta funcionalidad aun no se implementa"})
    }
    function createClub(req,res,next){
        res.status(404).json({success:false, msg:"Esta funcionalidad aun no se implementa"})
    }
    function createSeguidor(req,res,next){
        res.status(404).json({success:false, msg:"Esta funcionalidad aun no se implementa"})
    }
exports.handlePostIsUsers=handlePostIsUsers;
exports.createAsociado=createAsociado;
exports.createClub=createClub;
exports.createSeguidor=createSeguidor;