const {Schema, model}=require('mongoose');
const taskSchema=new Schema({
    titulo:{type:String},
    descripcion:{type:String, require:true},
    fechaVencimiento:{type:Date},
    idUsuario:{type:String, require:true},
    estado:{type:Boolean, default:false}
});
module.exports=model('task', taskSchema);