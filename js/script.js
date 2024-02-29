// burger

const burger = document.querySelector('.burger'),
	menu = document.querySelector('.menu'),
	page = document.querySelector('.page'),
	sections = document.querySelectorAll('[data-section]'),
	listMenu = document.querySelector('.menu__list'),
	header = document.querySelector('.header'),
	footer = document.querySelector('.footer');


page.style.paddingTop = `${header.offsetHeight + 50}px`


burger.addEventListener('click', (e) => {
	burger.classList.toggle('_active');
	menu.classList.toggle('_active');
	document.body.classList.toggle('_lock')
})



if (sections) {
	sections.forEach(section => {
		const label = section.querySelector('.section__title');
		if (label) {
			listMenu.insertAdjacentHTML('beforeend',
				`
				 <li class="menu__item">
                        <a href="#${section.dataset.section}" class="menu__link">${section.dataset.section}</a>
						<ul class="menu__submenu-list">
                   			 <li class="menu__submenu-item">
                        		<a href="" class="menu__submenu-link">Link</a>
                    		</li>
                   			 <li class="menu__submenu-item">
                        		<a href="" class="menu__submenu-link">Link</a>
                    		</li>
                   			 <li class="menu__submenu-item">
                        		<a href="" class="menu__submenu-link">Link</a>
                    		</li>
                		</ul>
                    </li>
			`)
			const menuList = document.querySelector('.menu__list');
			menuList.lastElementChild.firstElementChild.addEventListener('click', (e) => {
				e.preventDefault()
				document.body.classList.remove('_lock')
				burger.classList.remove('_active');
				menu.classList.remove('_active');
				window.scrollTo({
					top: section.offsetTop - (header.offsetHeight * 2) + 1,
					behavior: "smooth",
				});
			})
		}
	});
}

let lastScrollPosition = 0

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
			const id = lastElem.dataset.section;
			if (id) {
				const currentLink = menu.querySelector(`[href='#${id}']`);
				currentLink.classList.add('_active')
			}


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

const logo = document.querySelector('.header__logo');


logo.addEventListener('click', (e)=>{
	e.preventDefault()
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
})