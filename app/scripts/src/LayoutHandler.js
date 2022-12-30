class LayoutHandler {
	constructor() {
		this.init();
		this.handleDOM();
		this.handleEvents();
		this.initMap();
	}

	/**
	 * Declare global variables
	 */

	init() {}

	/**
	 * Handle DOM queries
	 */
	handleDOM() {
		// Navbar
		this.burgerButton = document.querySelector('.hamburger');
		this.listHeader = document.getElementById('navMenu');
		this.perspectiveWrapper = document.querySelector('.wrapper');
		this.headerContainer = document.querySelector('.navbar-container');
		this.hireButton = document.querySelector('.hire');

		// Home Section
		this.homeContent = document.querySelectorAll('.home-content');
		this.homeSection = document.getElementById('#homeSection');

		// Hire Section
		this.designButtons = document.querySelectorAll('.design-button');
	}

	/**
	 * Listen for events
	 */
	handleEvents() {
		// Used for functions closures
		const self = this;

		// FullPage library
		new fullpage('#fullPage', {
			// Scrolling
			autoScrolling: true,
			fitToSection: true,
			scrollBar: false,
			scrollOverflow: true,

			// Navigation
			menu: '#navMenu',
			navigation: true,
			navigationPosition: 'left',
			navigationTooltips: [' Home', ' Works', 'About', 'Contact', 'Hire us'],
			anchors: ['home', 'works', 'about', 'contact', 'hire'],
			showActiveTooltip: true,

			afterLoad: function (section, origin, destination, direction, trigger) {
				let hireButton = document.querySelector('.hire');
				if (origin.index !== 0) {
					hireButton.classList.add('visible');
				} else {
					hireButton.classList.remove('visible');
				}
			},

			beforeLeave: function (origin, destination, direction, trigger) {
				let links = document.querySelectorAll('.link');
				links.forEach((link, i, array) => {
					if (i == destination.index) {
						array.forEach((element) => {
							element.classList.remove('line');
						});
						link.classList.add('line');
					}
				});
			},

			// Design
			controlArrows: false,
			slidesNavigation: true,
			slidesNavPosition: 'top',
			sectionsColor: ['#000', '#000', '#000', '#000', '#000'],
		});

		// Swiper library
		new Swiper('.swiper', {
			loop: true,
			centeredSlides: true,
			slidesPerView: 1,

			// Responsive breakpoints
			breakpoints: {
				768: {
					slidesPerView: 3,
					spaceBetween: 0,
				},
			},

			navigation: {
				nextEl: '.next-button',
				prevEl: '.prev-button',
			},
		});

		// Hamburger menu
		this.burgerButton.addEventListener('click', () => {
			if (this.burgerButton.classList.toggle('is-active')) {
				this.listHeader.style.display = 'block';
				this.perspectiveWrapper.classList.add('perspective-wrapper');
			} else {
				this.listHeader.style.display = 'none';
				this.perspectiveWrapper.classList.remove('perspective-wrapper');
			}
		});

		// Home section
		this.homeContent.forEach((content, index, array) => {
			content.addEventListener('click', () => {
				array.forEach((element) => {
					element.classList.remove('active');
					element.classList.remove('move-content');
				});
				content.classList.add('active');
				content.classList.add('move-content');
			});
		});

		// Hire section
		this.designButtons.forEach((button) => {
			button.addEventListener('click', () => {
				console.log(button);
				button.classList.toggle('active');
			});
		});
	}

	/**
	 * Functions
	 */

	// Map
	initMap = () => {
		const map = new google.maps.Map(document.getElementById('map'), {
			center: { lat: 50.0647, lng: 19.945 },
			zoom: 13,
			disableDefaultUI: true,

			styles: [
				{
					featureType: 'all',
					elementType: 'labels.text.fill',
					stylers: [
						{
							saturation: 20,
						},
						{
							color: '#000',
						},
						{
							lightness: 40,
						},
					],
				},
				{
					featureType: 'all',
					elementType: 'labels.text.stroke',
					stylers: [
						{
							visibility: 'off',
						},
						{
							color: '#000',
						},
						{
							lightness: 10,
						},
					],
				},
				{
					featureType: 'all',
					elementType: 'labels.icon',
					stylers: [
						{
							visibility: 'off',
						},
					],
				},
				{
					featureType: 'administrative',
					elementType: 'geometry.fill',
					stylers: [
						{
							color: '#000000',
						},
						{
							lightness: 20,
						},
					],
				},
				{
					featureType: 'administrative',
					elementType: 'geometry.stroke',
					stylers: [
						{
							color: '#000000',
						},
						{
							lightness: 17,
						},
						{
							weight: 1.2,
						},
					],
				},
				{
					featureType: 'landscape',
					elementType: 'geometry',
					stylers: [
						{
							color: '#000000',
						},
						{
							lightness: 20,
						},
					],
				},
				{
					featureType: 'poi',
					elementType: 'geometry',
					stylers: [
						{
							color: '#000000',
						},
						{
							lightness: 21,
						},
					],
				},
				{
					featureType: 'road.highway',
					elementType: 'geometry.fill',
					stylers: [
						{
							color: '#000',
						},
						{
							lightness: 17,
						},
					],
				},
				{
					featureType: 'road.highway',
					elementType: 'geometry.stroke',
					stylers: [
						{
							color: '#000000',
						},
						{
							lightness: 29,
						},
						{
							weight: 0.2,
						},
					],
				},
				{
					featureType: 'road.arterial',
					elementType: 'geometry',
					stylers: [
						{
							color: '#000000',
						},
						{
							lightness: 18,
						},
					],
				},
				{
					featureType: 'road.local',
					elementType: 'geometry',
					stylers: [
						{
							color: '#000000',
						},
						{
							lightness: 16,
						},
					],
				},
				{
					featureType: 'transit',
					elementType: 'geometry',
					stylers: [
						{
							color: '#000000',
						},
						{
							lightness: 19,
						},
					],
				},
				{
					featureType: 'water',
					elementType: 'geometry',
					stylers: [
						{
							color: '#000000',
						},
						{
							lightness: 17,
						},
					],
				},
			],
		});

		new google.maps.Marker({
			position: map.getCenter(),
			icon: '../images/contact/pin.png',
			map: map,
		});
	};
}
