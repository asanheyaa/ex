const burger = document.querySelector('.burger'),
	menu = document.querySelector('.menu'),
	page = document.querySelector('.page'),
	sections = document.querySelectorAll('[data-section]'),
	listMenu = document.querySelector('.menu__list'),
	header = document.querySelector('.header'),
	footer = document.querySelector('.footer');


// padding depending on the height of the header
page.style.paddingTop = `${header.offsetHeight + 50}px`

// burger-menu
burger.addEventListener('click', (e) => {
	burger.classList.toggle('_active');
	menu.classList.toggle('_active');
	document.body.classList.toggle('_lock')
})


// automatic creation of links in the menu
if (sections.length > 0) {
	sections.forEach(section => {

		listMenu.insertAdjacentHTML('beforeend',
			`
				 <li class="menu__item">
                        <a href="#${section.dataset.section}" class="menu__link">${section.dataset.section}</a>
						
                    </li>
			`)

		const subSections = section.querySelectorAll('[data-subsection]');

		if (subSections.length > 0) {
			const listSubMenu = document.createElement('ul')
			listSubMenu.classList.add('menu__submenu-list')
			listMenu.lastElementChild.append(listSubMenu)
			subSections.forEach(subSection => {
				listSubMenu.insertAdjacentHTML('beforeend',
					`
					<li class="menu__submenu-item">
                        <a href="${subSection.dataset.subsection}" class="menu__submenu-link">${subSection.dataset.subsection}</a>
                    </li>
				`)
				listSubMenu.lastElementChild.firstElementChild.addEventListener('click', (e) => {
					scrollOnClick(e, subSection)
				})
			});
		}
		listMenu.lastElementChild.firstElementChild.addEventListener('click', (e) => {
			scrollOnClick(e, section)
		})

	});

	
	function scrollOnClick(e, section) {
		e.preventDefault()
		document.body.classList.remove('_lock')
		burger.classList.remove('_active');
		menu.classList.remove('_active');
		window.scrollTo({
			top: section.offsetTop - (header.offsetHeight * 2) + 1,
			behavior: "smooth",
		});
	}
}

let lastScrollPosition = 0

//Function active menu section 
function activeMenu() {

	if (sections) {
		window.addEventListener('scroll', activeMenuFunction)

		function activeMenuFunction(e) {
			let itemsless = []

			sections.forEach(section => {
				if (section.getBoundingClientRect().top - (header.offsetHeight * 2) < 0) {
					itemsless.push(section);
				}
				const id = section.dataset.section;
				if (id) {
					const currentLink = menu.querySelector(`[href='#${id}']`);
					currentLink.classList.remove('_active')
				}
			});
			if (window.scrollY > document.documentElement.scrollHeight - window.innerHeight - (footer.offsetHeight / 2)) {
				const id = sections[sections.length - 1].dataset.section;
				if (id) {
					const currentLink = menu.querySelector(`[href='#${id}']`);
					currentLink.classList.add('_active')
				}
				return
			}
			let lastElem = itemsless.slice(-1)[0];
			if (lastElem) {
				const id = lastElem.dataset.section;
					const currentLink = menu.querySelector(`[href='#${id}']`);
					currentLink.classList.add('_active')
			}

			// function Determining the direction of the stroll
			if (lastScrollPosition < window.scrollY) {
				menu.classList.remove('--sroll-up')
				menu.classList.add('--sroll-down')
				lastScrollPosition = window.scrollY
			} else {
				menu.classList.add('--sroll-up')
				menu.classList.remove('--sroll-down')
				lastScrollPosition = window.scrollY
			}

		}
		activeMenuFunction();
	}



}

activeMenu()

// click on logo function
const logo = document.querySelector('.header__logo');

logo.addEventListener('click', (e) => {
	e.preventDefault()
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
})
