const express=require('express');
const path=require('path');
const port=8000;
const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList=[
    {
        name:"ayushi",
        phone:"123456789"
    },
    {
        name:"avdhesh",
        phone:"1111111111"
    },
    {
        name:"sonali",
        phone:"0987654321"
    }
]
app.post('/contact_list',function(req,res)
{
      Contact.create({
          name:req.body.name,
          phone:req.body.phone
      },function(err,newContact){
          if(err)
          {
              console.log('error found in adding the contact');
              return;
          }
          console.log('********',newContact);
          return res.redirect('back');

      })
});
app.get('/delete-contact',function(req,res){
    let id=req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err)
        {
              console.log('error in deleting object from database');
              return;
        }
        return res.redirect('back');
    })
    
})



app.get('/',function(req,res){
     
    Contact.find({},function(err,contact){
        if(err)
        {
            console.log('error in fetching data from database');
            return;
        }
        return res.render('home',{
            title:"ayushi bhardwaj!",
            contact_list:contact
                
      
      });
    })
     
});
app.get('/practice',function(req,res){
    
    return res.render('practice',{title:"play with ejs!"});
});








app.listen(port,function(err){
    if(err)
{
    console.log('ERROR!!!!');
}
else{
    console.log('yup! my server is running on port:',port);
}

});