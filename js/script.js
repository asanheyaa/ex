// burger

const burger = document.querySelector('.burger'),
	menu = document.querySelector('.menu'),
	sections = document.querySelectorAll('[data-section]'),
	listMenu = document.querySelector('.menu__list'),
	header = document.querySelector('.header'),
	footer = document.querySelector('.footer');
	 
	

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
                    </li>
			`)
			const menuList = document.querySelector('.menu__list');
			menuList.lastElementChild.addEventListener('click', (e)=>{
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
		}
		activeMenuFunction();
	}



}

activeMenu()