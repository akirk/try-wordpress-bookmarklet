import { startPlaygroundWeb, login, installPlugin } from 'https://playground.wordpress.net/client/index.js';
const blueprint = { landingPage: '/wp-admin/?welcome=0', login: true, steps:[{ step: "resetData"}] };
startPlaygroundWeb({
	iframe: document.getElementById("wp"),
	remoteUrl: 'https://playground.wordpress.net/remote.html',
	onBlueprintStepCompleted: function( step ) {
		if ( typeof step === 'undefined' ) return;
		if ( typeof step.bytes != 'undefined' ) console.log( new TextDecoder().decode( step.bytes ) );
		console.log( step );
	},
	blueprint: blueprint
}).then(function ( p ) {
	const queue = [ location.href ];
	window.playground = p;

	Array.from(document.querySelectorAll('a')).forEach( function( link ) {
		const l = link.href.split( '#' )[0];
		if ( ! l ) return;
		if ( ! l.startsWith( location.origin ) ) return;
		if ( l.includes( '/tag/' ) ) return;
		if ( l.includes( '/category/' ) ) return;
		if ( l.includes( '/author/' ) ) return;
		if ( l.includes( '/wp-admin/' ) ) return;
		if ( l.includes( '/wp-login' ) ) return;
		if ( queue.includes( l ) ) return;
		queue.push( l );
	} );
	console.log( queue );
	extract();
	setInterval( extract, 5000 );
	function extract () {
		const status = function( text ) {
		const status = document.getElementById('playground-status');
		if ( status ) status.innerText = page + ': ' + text + '...';
			else console.log( text );
		};

		const page = queue.shift();
		status('Downloading');
		fetch( location.href ).then( function( response ) {
			status('Received HTML');
			response.text().then( function( text ) {
				status('Waiting for response from OpenAI');
				fetch( 'https://api.openai.com/v1/chat/completions', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + window.openAiKey
					},
					body: JSON.stringify({
						model: 'gpt-3.5-turbo-16k',
						messages: [
						{
							"role": "system",
							"content":
								'This is the HTML from the page ' + page + '. ' +
								'Return valid WordPress PHP to create the appropriate page using wp_insert_post with the right title and slug. ' +
								'Only use the post post_type when its a blog post.' +
								'Try to use the correct date and ensure to include the full post_content. ' +
								'Use WordPress PHP functions to set the appropriate title for the whole WordPress site. ' +
								'Also produce WordPress PHP code to recreate the navigation.'
						},
						{
							"role": "user",
							"content": text.substring(0,40000)
						}
						]
					})
				}).then( function( response ) {
					status('Sending to Playground');
					try {
						if ( ! response.ok ) throw response;
						response.json().then( function( data ) {
							const c = data.choices[0].message.content.replace(/```php/g, '<?php').replace(/```/g, '?>').replace(/<\\?php\\n<\\?php/g, '<?php');
							console.log('<?php require_once "wordpress/wp-load.php"; ?>' + c );
							p.run( { code:'<?php require_once "wordpress/wp-load.php"; ?>' + c } ).then(
								function( r ) {
									console.log( r );
									status('Completed');
								}
							);
						} );
					} catch ( e ) {
						console.log( e );
						status('Error');
					};
				});
			});
		});
	}
});
