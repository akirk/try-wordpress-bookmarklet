(async function() {

	const resizableDiv = document.createElement('div');
	resizableDiv.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 800px; height: 500px; background-color: lightblue; border: 2px solid #333; resize: both; overflow: auto;';
	const openAiKey = prompt('Please enter your OpenAI key');
	if ( !openAiKey ) {
		return;
	}
	window.openAiKey = openAiKey;
	let startX, startY, startWidth, startHeight;

	resizableDiv.addEventListener('mousedown', initResize, false);

	function initResize(e) {
		startX = e.clientX;
		startY = e.clientY;
		startWidth = parseInt(document.defaultView.getComputedStyle(resizableDiv).width, 10);
		startHeight = parseInt(document.defaultView.getComputedStyle(resizableDiv).height, 10);
		document.addEventListener('mousemove', doResize, false);
		document.addEventListener('mouseup', stopResize, false);
	}

	function doResize(e) {
		resizableDiv.style.width = startWidth + e.clientX - startX + 'px';
		resizableDiv.style.height = startHeight + e.clientY - startY + 'px';
	}

	function stopResize() {
		document.removeEventListener('mousemove', doResize, false);
		document.removeEventListener('mouseup', stopResize, false);
	}
	const wp = document.createElement('iframe');
	wp.id = 'wp';
	wp.style.cssText = 'width: 100%; height: 90%; border: none; background-color: white;';
	resizableDiv.appendChild( wp );

	const status = document.createElement('div');
	status.style.cssText = 'position: fixed; bottom: 0; left: 0; width: 100%; padding: .5em; background-color: white;';
	status.id = 'playground-status';
	status.innerHTML = 'Loading...';
	resizableDiv.appendChild(status);
	document.body.appendChild(resizableDiv);

	console.log( 'injected' );
	const script = document.createElement('script');
	script.type = 'module';
	script.text = 'PLAYGROUNDSCRIPT';

	document.body.appendChild(script);



})();

