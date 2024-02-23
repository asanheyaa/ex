// burger

const burger = document.querySelector('.burger');

burger.addEventListener('click', (e) => {
	burger.classList.toggle('_active');
	document.querySelector('.menu').classList.toggle('_active');
})


const sections = document.querySelectorAll('[data-section]'),
	listMenu = document.querySelector('.menu__list');
if (sections) {
	sections.forEach(section => {
		const label = section.querySelector('.section__title');
		if (label) {
			listMenu.insertAdjacentHTML('afterbegin',
				`
				 <li class="menu__item">
                        <a href="" class="menu__link">${label.innerHTML}</a>
                    </li>
			`)
			const menuLink = document.querySelector('.menu__link');
			menuLink.addEventListener('click', (e)=>{
				e.preventDefault()
				window.scrollTo({
					top: section.offsetTop,
					behavior: "smooth",
				});
			})
		}
	});
}