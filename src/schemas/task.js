const TaskModel=require('../models/taskModel');
const UserModel=require('../models/userModel');
const resolver={
    Query:
    {
        getTasks:async(_, {_id})=>
        {
            console.log(_id)
            var result=await TaskModel.find({idUsuario:_id});
            console.log(result);
            return result;
        },
        getTaskInfo:async(_,{_id})=>
        {
            var result=await TaskModel.findById(_id);
            return result;
        },
        createTask:async(_, {input})=>
        {
            var result=UserModel.findById(input.idUsuario);
            if(result)
            {
                var newTask=new TaskModel(input);
                await newTask.save();
                return true;
            }
            else
            {
                return false;
            }
        },
        deleteTask:async(_, {input})=>
        {
            var result=await UserModel.findById(input.idUsuario);
            if(result)
            {
                var response=await TaskModel.findByIdAndDelete(input._id);
                if(response)
                {
                    console.log("tarea eliminada")
                    return true;
                }
                else
                {
                    console.log('error al eliminar')
                    return false;
                }
            }
            else
            {
                return false;
            }
        }
    },
    Mutation:
    {
        createUser:async(_, {input})=>
        {
            var result=await UserModel.findOne({email:input.email});
            if(result)
            {
                return false;
            }
            else
            {
                var newUser=new UserModel(input);
                await newUser.save();
                return true;
            }
        },
        getAuth:async(_, {input})=>
        {
            console.log(input);
            var result=await UserModel.findOne({$and:[{email:input.email}, {password:input.password}]});
            if(result)
            {
                return result.id;
            }
            else
            {
                return 'failed';
            }
        },
        updateTask:async(_, {input})=>
        {
            var result=await UserModel.findById(input.idUsuario);
            if(result)
            {
                var response=await TaskModel.findByIdAndUpdate(input._id, {$set:input});
                if(response)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false
            }
        },
        completeTask:async(_, {input})=>
        {
            var result=await TaskModel.findOneAndUpdate({$and:[{_id:input.taskId}, {idUsuario:input.userId}]}, {$set:{estado:true}});
            if(result)
            {
                return true;
            }
            else
            {
                return false
            }
        }
    }
}
module.exports=resolver;