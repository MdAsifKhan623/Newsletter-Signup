//jshint esversion:6 

const express=require("express")
const bodyParser=require("body-parser")
const request=require("request")
const https=require("https")

const app= express()

// Adding the static folder for files such as images and .css 
app.use(express.static("static"))

//Body-Parser to get the input from the form elements
app.use(bodyParser.urlencoded({extended:true}))

//get method for showing the html file 
app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html")
})

//post method for taking  the input and posting it to a certain page.
app.post("/", function(req, res){
    const fName=req.body.firstName
    const lName=req.body.lastName
    const email=req.body.email
    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fName,
                    LNAME:lName
                }
            }
        ]
    }
    const url="https://us18.api.mailchimp.com/3.0/lists/a898e688fa"
    const jsonData= JSON.stringify(data)
    const options={
        method:"POST",
        auth:"Asif623:cf700142213296235397e7e6c71579e8-us18"
    }
    const request=https.request(url, options, function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname+"/success.html")
        }
        else
        {
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data", function(data){
            console.log(JSON.parse(data))
        })
    })
    request.write(jsonData)
    request.end()
})
app.post("/failure", function(req, res){
    res.redirect("/");
})

//declaring the port number where locahost is hosted.
app.listen(3000, function(){
    console.log("Port 3000 started")
})

//API key MailChimp
// cf700142213296235397e7e6c71579e8-us18

//Unique ID
//a898e688fa

//{"name":"Freddie'\''s Favorite Hats","contact":{"company":"Mailchimp","address1":"675 Ponce De Leon Ave NE","address2":"Suite 5000","city":"Atlanta","state":"GA","zip":"30308","country":"US","phone":""},"permission_reminder":"You'\''re receiving this email because you signed up for updates about Freddie'\''s newest hats.","campaign_defaults":{"from_name":"Freddie","from_email":"freddie@freddiehats.com","subject":"","language":"en"},"email_type_option":true}