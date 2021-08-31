let mongoose ;
try {
    mongoose = require("mongoose");
  } catch (e) {
    console.log(e);
  }
/*La función se le pasa la URI y una funcion done(error,db)=>error===null si todo va bien y db === dbmongo
 */
async function connect(strHost, done) {
  console.log(strHost);
  const dbmongo = await mongoose
    .connect(strHost, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
     // useCreateIndex: true,
     // useFindAndModify: false,
    })
    .then((db) => {
        console.log("Moongose se ha conectado :");
        done(null,mongoose);

    })
    .catch((error) =>{
      console.log("Ha ocurrido un error en el momento de conectar a mongo db");
      done(error,null);
    }
    );

  const db = mongoose.connection;

  db.once("open", (_) => {
    console.log("conected: ", strHost);
  });

  db.on("error", (err) => {
    throw new error("Ha ocurrido un error");
  });
}

async function close() {
  return await mongoose.connection
    .close()
    .then("Moongoose se ha desconectado")
    .catch((err) => {
      throw new error(
        "Ha ocurrido un error mientras se cerraban las coneciones"
      );
    });
}

exports.connect=connect;
exports.close=close;
 