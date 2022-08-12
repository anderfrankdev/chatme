function toggleForm() {
	const loginBtn = document.getElementById('login-btn')
	const loginForm = document.getElementById('login-form')
	const loginArrow = document.getElementById('login-arrow')
	let style="mobile"

	window.addEventListener("resize",()=>{
		if (!(window.matchMedia("(min-width: 53.125em)").matches)&&
			style=="desktop") {

			loginForm.style.top="0"

			signForm.style.top="0"
			style="mobile"
		}
		if ((window.matchMedia("(min-width: 53.125em)").matches)&&
			style=="mobile") {
			loginForm.style.top="unset"
			loginForm.style.right="-110%"

			signForm.style.top="unset"
			style="desktop"

		}
		return
	})

	const toggleOut=(form)=>{
		const arrow = form.querySelector(".arrow-icon")
		if (form.dataset.animation.includes("right")) {
			form.style.right="100%"
			form.dataset.animation="left"
			arrow.style.transform="rotate(0)"

			return
		}
		if (form.dataset.animation.includes("left")) {
			
			form.style.right="-100%"
			arrow.style.transform="rotate(180deg)"
			form.dataset.animation="right"
			return
		}
		if (!form.dataset.animation) {

			form.style.right="100%"
			form.dataset.animation="left"
			arrow.style.transform="rotate(0)"

			return

		}
	}

	loginBtn.addEventListener("click",e=>{
		
		if (window.matchMedia("(min-width: 53.125em)").matches) {
			loginForm.style.right="unset"
			loginForm.style.top="unset"

			return
		}

		loginForm.style.right="0"

	})

	loginArrow.addEventListener("click",e=>{
		
		if (window.matchMedia("(min-width: 53.125em)").matches) {
			
			loginForm.style.right="100%"
			
			
		}
		
		return toggleOut(loginForm)
		
		
		
	})

	const signBtn = document.getElementById('signup-btn')
	const signForm = document.getElementById('signup-form')
	const signArrow = document.getElementById('signup-arrow')
	
	signBtn.addEventListener("click",e=>{

		if (window.matchMedia("(min-width: 53.125em)").matches) {
			signForm.style.right="unset"
			signForm.style.top="unset"

			return
		}

		signForm.style.right="0"

	})

	signArrow.addEventListener("click",e=>{


		if (window.matchMedia("(min-width: 53.125em)").matches) {
			
			signForm.style.right="100%"
			
			
		}
		
		return toggleOut(signForm)

	})
}

export {
	toggleForm
}