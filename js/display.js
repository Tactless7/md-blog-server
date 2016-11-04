(function(){
	"use strict";
	var app = {
		menu: null,
		article: null,
		config: {},
		init:function(){
			var self = this;
			this.config = window.appConfig;
			$('#articles').on('click', 'a', function(event){
				event.preventDefault();
				self.getFile($(this).attr('href'));
				return false;
			});
			this.get('/menu.json', this.displayMenu.bind(this));
		},
		get: function(path, callback){
			$.ajax({
				url: this.config.url + path,
				type: 'GET',
				success: callback.bind(this),
				error: function(){
					console.log('error JSON');
				},
			});
		},
		getFile: function(page){
			this.get(page, this.displayFile.bind(this));
		},
		displayFile: function(data){
			this.article = data;
			this.transformMd(data);
		},
		transformMd: function(text){
			var converter = new showdown.Converter(),
			html = converter.makeHtml(text);
			$('#corpus').html(html);
		},
		displayMenu: function(data){
			app.menu = data.menu;
			for(var i = 0; i < this.menu.length ; i++){
				$('#articles').append('<a href="' + this.menu[i].path + '" class="item">' + app.menu[i].title +'</a>');
			}
		}
	};

	$(document).ready(function(){
		app.init();
	});
})();