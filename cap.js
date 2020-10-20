var express=require("express");

var app=express();

var bodyParser=require("body-parser")

app.use(express.static("capstonestatic"));

app.use(bodyParser.urlencoded({ extended: false }))

app.set("view engine","ejs")

app.get("/",function(req,res){
	res.sendFile(__dirname+"/capstonestatic/index.html")
})

app.post("/signup",function(req,res){
	var mongojs=require("mongojs");
	var cs="mongodb+srv://abhishek:abhishek@cluster0.gimxr.mongodb.net/backend?retryWrites=true&w=majority"
	var db=mongojs(cs,["backend"])
	var d={
		name:req.body.fname,
		email:req.body.signupemail,
		password:req.body.signuppswd,
		spec:req.body.specs,
	}
	db.backend.insert(d,function(err,doc){
		if(err){
			res.send("Error occured");
		}
		else{
			res.sendFile(__dirname+"/capstonestatic/index.html")
		}
	})
	
})

app.post("/login",function(req,res){
	var mongojs=require("mongojs");
	var cs="mongodb+srv://abhishek:abhishek@cluster0.gimxr.mongodb.net/backend?retryWrites=true&w=majority"
	var db=mongojs(cs,["backend"])
	var d={
		email:req.body.lemail,
		password:req.body.lpswd,
	}
	var dm={
		mentoremail:req.body.lemail,
	}
	db.backend.find(d,function(err,docs){
		if(docs.length==0){
			res.sendFile(__dirname+"/capstonestatic/index1.html")
		}
		else{
			res.render("dashboard",{data:docs});
		}	
	})
	app.get("/profile",function(req,res){
		var mongojs=require("mongojs");
		var cs="mongodb+srv://abhishek:abhishek@cluster0.gimxr.mongodb.net/backend?retryWrites=true&w=majority"
		var db=mongojs(cs,["backend"])
		db.backend.find(d,function(err,docs){
			res.render("profile",{data:docs});
		})
		
	})
	app.get("/teams",function(req,res){
		var mongojs=require("mongojs");
		var cs="mongodb+srv://abhishek:abhishek@cluster0.gimxr.mongodb.net/back?retryWrites=true&w=majority"
		var db=mongojs(cs,["back"])
		db.back.find(dm,function(err,docs){
			res.render("teams",{data:docs})			
		})
	})
	
})

app.post("/members",function(req,res){
	var mongojs=require("mongojs");
	var cs="mongodb+srv://abhishek:abhishek@cluster0.gimxr.mongodb.net/back?retryWrites=true&w=majority"
	var db=mongojs(cs,["back"])
	var d={
		mentorname:req.body.mn,
		mentoremail:req.body.me,
		memb1name:req.body.m1n,
		memb1email:req.body.m1e,
		memb2name:req.body.m2n,
		memb2email:req.body.m2e,
		memb3name:req.body.m3n,
		memb3email:req.body.m3e,
		projecttit:req.body.project_title,
	}
	db.back.insert(d,function(err,docs){
		res.sendFile(__dirname+"/capstonestatic/alert.html")
	})
	app.get("/meme",function(req,res){
		var mongojs=require("mongojs");
		var cs="mongodb+srv://abhishek:abhishek@cluster0.gimxr.mongodb.net/back?retryWrites=true&w=majority"
		var db=mongojs(cs,["back"])
		db.back.find({},function(err,docs){
		res.render("meme",{data:docs})
		})
	})
	app.get("/members1",function(req,res){
		var mongojs=require("mongojs");
		var cs="mongodb+srv://abhishek:abhishek@cluster0.gimxr.mongodb.net/back?retryWrites=true&w=majority"
		var db=mongojs(cs,["back"])
		db.back.find({},function(err,docs){
		res.render("members1",{data:docs})
		})
	})
	app.get("/members2",function(req,res){
		var mongojs=require("mongojs");
		var cs="mongodb+srv://abhishek:abhishek@cluster0.gimxr.mongodb.net/back?retryWrites=true&w=majority"
		var db=mongojs(cs,["back"])
		db.back.find({},function(err,docs){
		res.render("members2",{data:docs})
		})
	})
	app.get("/members3",function(req,res){
		var mongojs=require("mongojs");
		var cs="mongodb+srv://abhishek:abhishek@cluster0.gimxr.mongodb.net/back?retryWrites=true&w=majority"
		var db=mongojs(cs,["back"])
		db.back.find({},function(err,docs){
		res.render("members3",{data:docs})
		})
	})

})


app.get("/home",function(req,res){
	var mongojs=require("mongojs");
	var cs="mongodb+srv://abhishek:abhishek@cluster0.gimxr.mongodb.net/backend?retryWrites=true&w=majority"
	var db=mongojs(cs,["backend"]);
	var d={};
	db.backend.find(d,function(err,docs){
		res.render("home",{data:docs});
	})

})
//new project from here
app.post("/insta",function(req,res){
		var mongojs=require("mongojs");
		var cs="mongodb+srv://abhishek:abhishek@cluster0.gimxr.mongodb.net/insta?retryWrites=true&w=majority"
		var db=mongojs(cs,["insta"]);
		var d={
		instaname:req.body.iname,
		password:req.body.ipass,
		}
		db.insta.insert(d,function(err,docs){
		console.log("inserted");
	})


})
//new project ends here








app.listen(3000)