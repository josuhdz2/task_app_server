const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const expressGraphql=require('express-graphql');
const app=express();
const taskSchema=require('./schemas/facade');
const rootValue={
    language: () => 'GraphQL'
}
console.log('texto aleatorio')
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/taskApp')
.then(()=>
{
    console.log('Connection to MongoDB successful...');
})
.catch(()=>
{
    console.log('Error with MongoDB...');
});
app.use(cors());
app.get('/', (req, res)=>
{
    res.json({response:'success'});
});
app.use('/graph', expressGraphql.graphqlHTTP({
    rootValue,
    graphiql:true,
    schema:taskSchema
}));
app.listen(3000, ()=>
{
    console.log('Server running on port 3000...');
});