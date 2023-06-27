//modulo para importar un esquema ejecutable
const {makeExecutableSchema}=require('@graphql-tools/schema');
//modulo para cargar archivos en formato graphql
const {loadFile}=require('graphql-import-files');
//carga del archivo graphql
const types=loadFile('./src/schemas/task.graphql');
//carga del archivo de acciones de la api o resolvers
const querys=require('./task');
//exportar el modulo para ejecucion de consultas
module.exports=makeExecutableSchema({typeDefs:types, resolvers:querys});
