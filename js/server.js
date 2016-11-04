/*Déclaration de variables nécessaires*/
var express = require('express');
var app = express(); 
var bodyParser = require('body-parser');
var fs = require('fs');
var slug = require('slug');

var urlencodedParser = bodyParser.urlencoded({ extended: false});

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});


// app.get('/', function (req, res) { //Lorsque tu te rends sur la page d'accueil (/ => racine)
//   res.send('Hello World!');
// });

app.post('/edit', urlencodedParser, function(req, res){ // Quand post depuis editArticle, alors traite les données envoyées
	/* Ici je traite les données du post fait depuis editArticle*/
	fs.writeFile('articles' + req.body.path, req.body.content, 'utf8', function(err, data){
		if(err){
			return console.log(err);
		}
		return console.log('fichier écrasé');
	});
});

app.post('/create', urlencodedParser, function(req, res){
	var newPath = '/' + slug(req.body.title) + '.md';
	var menuItem = {path: newPath, title: req.body.title};
	var menuJson;
	
	fs.writeFile('articles' + newPath, req.body.content, 'utf8', function(err, data){
		if(err){
			return console.log(err);
		}
		return console.log('fichier créé');
	});

	fs.readFile('menu/menu.json', function(err, data){
		if(err){
			return console.log(err);
		}
		menuJson = JSON.parse(data);
		menuJson['menu'].push(menuItem);
		menuJson = JSON.stringify(menuJson);
		console.log(menuJson);

		fs.writeFile('menu/menu.json', menuJson, 'utf8', function(err, data){
			if(err){
				return console.log(err);
			}
			return console.log('menu modifié');
		});
		
	});
});


/*Ecoute le port 2605*/
app.listen(2605, function () {
  console.log('Your app is listening on port 2605!');
});

/* Dossiers accessibles depuis l'extérieur*/
app.use(express.static('articles'));
app.use(express.static('menu'));
app.use(express.static('html'));
app.use(express.static('node_modules'));