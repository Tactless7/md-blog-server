(function(){
	'use strict';
	var app = {
		menu: null, //tableau
		config: {},
		currentPath: null, //path en cours de modification
		currentTitle: null, // title en cours de modification
		currentContent: null, // contenu en cours de modification
		init: function(){
			this.config = window.appConfig;
			this.listeners();
			this.get('/menu.json', this.displaySelect.bind(this));
		},
		listeners: function(){
			$('#select').on('click', this.selectPost.bind(this));
			$('form').on('submit', function(event){
				event.preventDefault();
				return false;
			});
			$('#save').on('click', this.saveChanges.bind(this));
		},

		get: function(path, callback){
			$.ajax({
				url: this.config.url + path,
				type: 'GET',
				success: callback.bind(this),
			});
		},
		displaySelect: function(data){
			this.menu = data.menu;
			for(var i = 0; i < this.menu.length ; i++){
				$('#titlesPost').append('<option data-path="' + this.menu[i].path +'" value="' + this.menu[i].title + '">' + this.menu[i].title + '</option>');
			}
		},
		selectPost: function(){
			this.currentPath = $('option:selected').data('path');
			this.currentTitle = $('option:selected').val();
			this.get(this.currentPath, this.displayPost.bind(this));
		},
		displayPost: function(data){
			this.currentContent = data;
			$('#editPost').val(this.currentContent);
			$('#title').val(this.currentTitle);
		},
		saveChanges: function(){
			this.currentContent = $('#editPost').val();
			this.currentTitle = $('#title').val();
			this.postChanges('/edit', this.init.bind(this));
		},
		postChanges: function(path, callback){
			$.ajax({
				url: this.config.url + path,
				type: 'POST',
				data: {
					path: this.currentPath,
					title: this.currentTitle,
					content: this.currentContent
				},
				success: callback.bind(this)
			});
		}

	}

	$(document).ready(function(){
		app.init();
	});
})();