const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const uri = "mongodb+srv://Rick:j40qvCxvtJ4eyjX2@movie-flix.2uk6wdr.mongodb.net/";
let singleton;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connect() {
  try {

    if (singleton) return singleton;
    await client.connect();
    singleton = client.db("Movie_Flix");
    return singleton;

  } finally {
    // console.log(client.db("Movie_Flix").collection("usuarios"))
  }
}


async function deleteFavoritos(dados) {
  const db = await connect();
  const result = await db.collection("favoritos").deleteOne(dados);
  return result
}

async function insertFavoritos(dados) {
  const db = await connect();
  const insert = await db.collection("favoritos").insertOne(dados);
  return insert
}

async function getFavoritosUsuario(idUsuario) {
  const db = await connect();
  const usuario = await db.collection("favoritos").find({ "usuarios_id": idUsuario }).toArray();
  return usuario
}

async function insertUsuario(usuario) {
  const db = await connect();
  const insert = await db.collection("usuarios").insertOne(usuario);
  return insert
}

async function getUsuarios() {
  const db = await connect();
  const usuarios = await db.collection("usuarios").find().toArray();
  return usuarios
}

async function getUsuario(pesquisa) {
  const db = await connect();
  const usuario = await db.collection("usuarios").findOne(pesquisa);
  return usuario
}


module.exports = {
  getUsuario, getUsuarios, insertUsuario, insertFavoritos, getFavoritosUsuario,deleteFavoritos
}


