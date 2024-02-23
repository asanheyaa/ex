// burger

const burger = document.querySelector('.burger'),
	menu = document.querySelector('.menu');
	

burger.addEventListener('click', (e) => {
	burger.classList.toggle('_active');
	menu.classList.toggle('_active');
})


const sections = document.querySelectorAll('[data-section]'),
	listMenu = document.querySelector('.menu__list');
if (sections) {
	sections.forEach(section => {
		const label = section.querySelector('.section__title');
		if (label) {
			listMenu.insertAdjacentHTML('beforeend',
				`
				 <li class="menu__item">
                        <a href="" class="menu__link">${label.innerHTML}</a>
                    </li>
			`)
			const menuList = document.querySelector('.menu__list');
			menuList.lastElementChild.addEventListener('click', (e)=>{
				e.preventDefault()
				window.scrollTo({
					top: section.offsetTop - 20,
					behavior: "smooth",
				});
			})
		}
	});
}