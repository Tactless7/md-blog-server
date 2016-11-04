(function(){
	'use strict';
	var app = {
		config: {},
		newPost: null,
		newTitle: null,
		newPath: null,
		init: function(){
			this.config = window.appConfig;
			this.listeners();
		},
		listeners: function(){
			$('#create').on('click', this.createArticle.bind(this));
		},
		post: function(path){
			$.ajax({
				url: this.config.url + path,
				type: 'POST',
				success: function(){
					console.log('Données envoyées au serveur');
				},
				data: {
					title: this.newTitle,
					content: this.newPost
				}
			});
		},
		createArticle: function(){
			console.log('je clique');
			this.newTitle = $('#newTitle').val();
			this.newPost = $('#newPost').val();
			this.post('/create');
		},
	}

	$(document).ready(function(){
		app.init();
	});

})();