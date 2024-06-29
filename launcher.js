(async function() {

	const openAiKey = prompt('Please enter your OpenAI key');
	if ( !openAiKey ) {
		return;
	}
	window.openAiKey = openAiKey;
	document.getElementsByTagName('html')[0].style.width = '50%';
	const resizableDiv = document.createElement('div');
	resizableDiv.style.width = '50%';
	resizableDiv.style.height = '100vh';
	resizableDiv.style.position = 'fixed';
	resizableDiv.style.top = '0';
	resizableDiv.style.left = '50%';
	resizableDiv.style.display = 'flex';
	resizableDiv.style.flexDirection = 'column';
	resizableDiv.style.gap = '1px';
	resizableDiv.style.borderLeft = '1px solid gray';
	resizableDiv.style.backgroundColor = '#56c0ff';
	document.body.appendChild(resizableDiv);
	let isResizing = false;
	let originalWidth = resizableDiv.offsetWidth;

	resizableDiv.addEventListener('mousedown', (e) => {
		if (e.clientX >= resizableDiv.offsetWidth - 10 && e.clientY >= 0 && e.clientY <= resizableDiv.offsetHeight) {
			isResizing = true;
			originalWidth = resizableDiv.offsetWidth;
		}
	});

	document.addEventListener('mousemove', (e) => {
		if (isResizing) {
			const newWidth = e.clientX - handleOffsetLeft;
			resizableDiv.style.width = `${newWidth}px`;

			document.body.style.width = `${newWidth + 10}%`;
		}
	});

	document.addEventListener('mouseup', () => {
		isResizing = false;
	});

	const wp = document.createElement('iframe');
	wp.id = 'wp';
	wp.style.border = 'none';
	wp.style.backgroundColor = 'white';
	wp.style.flex = '10';
	resizableDiv.appendChild( wp );

	const status = document.createElement('div');
	status.style.padding = '.5em';
	status.style.backgroundColor = 'white';
	status.style.flex = '1';
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

