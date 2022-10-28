/* eslint-disable no-undef */
// @ts-nocheck
const myApp = {};

myApp.init = () => {
	particlesJS('particles-js2', 'particles.json');

	//google analytics
	window.dataLayer = window.dataLayer || [];
	function gtag() {
		dataLayer.push(arguments);
	}
	gtag('js', new Date());
	gtag('config', 'G-J83V2J66Q1');

	//scroll down button homepage
	$('.dark-scroll-down').on('click', function () {
		$('html, body').animate({ scrollTop: $('main').offset().top }, 'slow');
	});

	//no active links on skills canvas
	$('#tags').on('click', function () {
		return false;
	});

	//scroll up button
	$('.scroll-up').on('click', function () {
		$('html, body').animate(
			{
				scrollTop: 0,
			},
			800
		);
	});

	$(window).on('scroll', function () {
		if ($(window).scrollTop() > $(window).height()) {
			$('.scroll-up').fadeIn();
			$('.scroll-up').attr('tabindex', '1');
			$('.scroll-up').removeClass('hide-scroll-up');
		} else {
			$('.scroll-up').fadeOut();
		}
	});

	// tabable divs and inputs
	$(document).on('keyup', '.button', function (e) {
		if (e.which == 13 || e.which == 32) $(this).click();
	});

	// projects wall
	const modalInfo = {
		1: {
			title: 'ReadyWhen App',
			skills: 'React | Typescript | Redux - 2022',
			info: `<p>ReadyWhen is a simple, secure, and fast digital Estate management solution.</p>
							<p>Built on our platform using military-grade encryption and security protocols.</p>`,
			link: 'https://app.readywhen.ca',
		},
		2: {
			title: 'Portfolio',
			skills: 'Javascript | jQuery | CSS | HTML - 2020',
			info: `<p>My Portfolio v.1</p>`,
			link: 'https://petryga.github.io/portfolio-2020/',
		},
		3: {
			title: 'Film Buff',
			skills: 'React | Firebase | API | HTML | CSS - 2020',
			info: `<p>Uses The Movie DB API and Firebase</p>`,
			link: 'https://petryga.github.io/filmBuff/',
		},
		4: {
			title: 'Travel From Home',
			skills: 'React | Firebase | JavaScript | API | SCSS | HTML - 2020',
			info: `<p>Image Gallery / Travel Journal Combo</p>`,
			link: 'https://petryga.github.io/Aleksandra-Petryga-Project-Five/',
		},
		5: {
			title: 'Medieval Art Meme Gallery',
			skills: 'JavaScript | 2 APIs | SCSS | HTML - 2020',
			info: `<p>An app that displays a random famous art piece along with a random dad joke.</p>
						<p>Uses two APIs - The Cleveland Museum of Art API and Dad Jokes API.</p>`,
			link: 'https://petryga.github.io/Medieval-Art-Meme-Gallery/',
		},
		6: {
			title: 'Toronto / Vancouver Skyline',
			skills: 'jQuery | SCSS | HTML - 2020',
			info: `<p>A widget that was inspired by the breathtaking Toronto & Vancouver skylines</p>`,
			link: 'https://petryga.github.io/Aleksandra-Petryga-Project-Three/',
		},
	};

	const modal = document.getElementById('preview');

	const btn = document.getElementsByClassName('button');

	const span = document.getElementsByClassName('close')[0];

	for (let i = 0; i < btn.length; i++) {
		btn[i].addEventListener('click', function () {
			const project = btn[i].parentElement;
			openModal(project);
		});
	}

	function openModal(project) {
		const id = project.id;
		const img = project.getElementsByTagName('img')[0].src;

		fillOut(id, img);
		modal.style.display = 'block';
		document.getElementsByClassName('modal-content')[0].classList.add('scale');
	}

	function fillOut(id, img) {
		document.getElementById('title').innerHTML = modalInfo[id].title;
		document.getElementById('skills').innerHTML = modalInfo[id].skills;
		document.getElementById('info').innerHTML = modalInfo[id].info;
		document.getElementById('img').src = img;
		document.getElementById('live').onclick = function () {
			window.open(modalInfo[id].link, '_blank');
		};
	}

	span.onclick = function () {
		modal.style.display = 'none';
	};

	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = 'none';
		}
	};

	$(document).ready(function () {
		if (
			!$('#myCanvas').tagcanvas(
				{
					textFont: 'Montserrat',
					textColour: '#13E0EB',
					outlineColour: 'transparent',
					reverse: false,
					depth: 1.2,
					maxSpeed: 0.04,
					wheelZoom: false,
					activeCursor: 'default',
					minSpeed: 0.01,
					initial: [0.1, -0.1],
					weight: true,
					weightMode: 'size',
				},
				'tags'
			)
		) {
			$('#myCanvasContainer');
		}

		const elements = document.getElementsByClassName('alpha');
		for (let i = 0; i <= elements.length; i++) {
			elements[i].addEventListener('animationend', function () {
				elements[i].classList.remove('animated');
			});
			elements[i].addEventListener('mouseover', function () {
				elements[i].classList.add('animated');
			});
		}
	});
};

$(function () {
	myApp.init();
	AOS.init();
});

// Synthwave world
let c = document.createElement('canvas').getContext('2d');

let postctx = document.body.appendChild(document.createElement('canvas')).getContext('2d');

// This is for TV-effect
let redFilter = document.createElement('canvas').getContext('2d');
let greenFilter = document.createElement('canvas').getContext('2d');
let blueFilter = document.createElement('canvas').getContext('2d');

let canvas = c.canvas;

var lastCanvas = document.querySelectorAll('canvas:nth-of-type(1)');
lastCanvas[1].setAttribute('id', 'darkCanvas');

let frame = 0;
let noise = 0;

// Properties

let grid = 40;
let perspective = 100;
let depth = 3000;
let cameraY = 100;

// Common
let xInterval = depth / grid;

let drawLine = (x1, y1, x2, y2) => {
	c.beginPath();
	c.moveTo(x1, y1);
	c.lineTo(x2, y2);
	c.stroke();
};

let drawSun = (x, y, r) => {
	c.fillStyle = c.createLinearGradient(x, y - r, x, y + r);
	c.fillStyle.addColorStop(0.1, '#fdce74');
	c.fillStyle.addColorStop(0.8, '#d60066');

	c.beginPath();
	c.arc(x, y, r, 0, Math.PI * 2);
	c.fill();
};

// Render loop
let loop = () => {
	frame++;

	// Resizing canvas
	if (
		postctx.canvas.width !== postctx.canvas.offsetWidth ||
		postctx.canvas.height !== postctx.canvas.offsetHeight
	) {
		postctx.canvas.width =
			canvas.width =
			redFilter.canvas.width =
			greenFilter.canvas.width =
			blueFilter.canvas.width =
				postctx.canvas.offsetWidth / 2;

		postctx.canvas.height =
			canvas.height =
			redFilter.canvas.height =
			greenFilter.canvas.height =
			blueFilter.canvas.height =
				postctx.canvas.offsetHeight / 2;
	}

	c.fillStyle = '#0f050d';

	c.fillRect(0, 0, canvas.width, canvas.height);
	c.save();
	c.translate(canvas.width / 2, canvas.height / 2);

	c.strokeStyle = '#00e9ff';
	// Vertical Lines
	for (let i = 0; i < grid * 10; i++) {
		let x1 = (-grid * 5 + i) * xInterval;
		let y1 = cameraY;
		let z1 = 1;

		let x2 = x1;
		let y2 = y1;
		let z2 = depth;

		let px1 = (x1 / z1) * perspective;
		let py1 = (y1 / z1) * perspective;

		let px2 = (x2 / z2) * perspective;
		let py2 = (y2 / z2) * perspective;

		drawLine(px1, py1, px2, py2);
	}

	if (window.innerWidth <= 650) {
		drawSun(0, -40, 80);
	} else {
		drawSun(0, -62, 128);
	}

	c.restore();

	// Post-processing
	// Getting only red colors from canvas
	redFilter.drawImage(canvas, 2, 0);
	redFilter.globalCompositeOperation = 'multiply';
	redFilter.fillStyle = '#f00';
	redFilter.fillRect(0, 0, canvas.width, canvas.height);
	redFilter.globalCompositeOperation = 'source-over';

	// Getting only green colors from canvas
	greenFilter.drawImage(canvas, 2, 0);
	greenFilter.globalCompositeOperation = 'multiply';
	greenFilter.fillStyle = '#0f0';
	greenFilter.fillRect(0, 0, canvas.width, canvas.height);
	greenFilter.globalCompositeOperation = 'source-over';

	// Getting only blue colors from canvas
	blueFilter.drawImage(canvas, 2, 0);
	blueFilter.globalCompositeOperation = 'multiply';
	blueFilter.fillStyle = '#00f';
	blueFilter.fillRect(0, 0, canvas.width, canvas.height);
	blueFilter.globalCompositeOperation = 'source-over';

	// Combine all filter in one with bloom effect and color shifting

	// Generates each 5 frame a new color shift
	if (frame % 5 === 0) {
		noise = Math.random();
	}

	postctx.clearRect(0, 0, canvas.width, canvas.height);
	postctx.globalCompositeOperation = 'screen';
	postctx.filter = 'blur(0.5px)';
	postctx.drawImage(redFilter.canvas, 1, 0);
	postctx.drawImage(greenFilter.canvas, -1 * noise, 0);
	postctx.drawImage(blueFilter.canvas, -5 * noise, 0);

	postctx.filter = 'blur(8px)';
	postctx.drawImage(postctx.canvas, 0, 0);
	postctx.globalCompositeOperation = 'source-over';

	requestAnimationFrame(loop);
};

loop();

console.log('Credits:');
console.log('Hero canvas by Radik - https://codepen.io/H2xDev');
console.log('Hero text by Ion Emil Negoita - https://codepen.io/inegoita');
console.log('Skills section canvas - https://goat1000.com/tagcanvas.php');
console.log(
	'Contact section canvas by Vincent Garreau - https://github.com/VincentGarreau/particles.js/'
);
console.log(`Skillfully combined by me ¯\\_(ツ)_/¯`);
