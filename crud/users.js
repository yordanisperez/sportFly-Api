const User= require('../model/user');


const createNewUser=async function(userJson,done){ 
    let doc = new User (userJson);
    await doc.save()
            .then((saveDoc)=>
            {
                done(null,doc)
            })
            .catch((error)=>{
                done(error,doc)
            })
    return doc;
  }
  
  const findAllUser = async (done) => {
      try{
        const doc=await User.find({},'name').exec();
        done(doc,null);
      }catch(error){
          done(error,null);
      }
   
    };
  
    const getUser = async (idUser,done) => {
        try{
            const doc = await User.findOne({_id:idUser}).exec();
            done(null,doc);           
      }catch(error){
          done(error,null);
      }
    };


    const getUserForName = async (name,done) => {
        try{
            const doc = await User.findOne({name:name}).exec();
            done(doc,null);
        }catch(error){
            done(error,null);
        }

      };
  
      const getUserForEmail = async (e,done) => {
          try{
            const doc=await User.findOne({email:'yordanis@gmail.com'}).exec();
            done(null,doc)
          }catch(error){
              done(error,null);
          }       
      };  

  exports.createNewUser=createNewUser
  exports.findAllUser=findAllUser
  exports.getUser=getUser
  exports.getUserForName=getUserForName
  exports.getUserForEmail=getUserForEmail