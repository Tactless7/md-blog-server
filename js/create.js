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
			$('#create').on('click', createArticle.bind(this));
		},
		post: function(){
			$.ajax({
				url: this.config.url,
				type: 'POST',
				success: function(){
					console.log('Données envoyées au serveur');
				},
				error: 'error post',
				datatype : 'html',
				data : {title: this.newTitle, content: this.newPost, path: this.newPath}
			});
		},
		createArticle: function(){
			this.newTitle = $('newTitle').val();
			this.newPost = $('#newPost').val();
			this.post();
		},
	}
})();