(function(){
	'use strict';
	var app = {
		menu: null,
		config: {},
		currentPath: null,
		currentTitle: null,
		currentContent: null,
		init: function(){
			this.config = window.appConfig;
			this.listeners();
			this.get('/menu.json', this.displaySelect.bind(this));
		},
		listeners: function(){
			$('#select').on('click', this.selectPost.bind(this));
			$('#save').on('click', this.saveChanges.bind(this));
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
		getTitle: function(){

		},
		displayPost: function(data){
			this.currentContent = data;
			$('#editPost').val(this.currentContent);
			$('#title').val(this.currentTitle);
		},
		saveChanges: function(){
			console.log('Sauvegardons les changements !');
		}
	}

	$(document).ready(function(){
		app.init();
	});
})();