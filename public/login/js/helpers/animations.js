function toggleForm() {
	const loginBtn = document.getElementById('login-btn')
	const loginForm = document.getElementById('login-form')
	const loginArrow = document.getElementById('login-arrow')

	loginBtn.addEventListener("click",e=>{
			
		loginForm.style.right="0"

	})
	loginArrow.addEventListener("click",e=>{
		
		
		if (loginForm.dataset.animation.includes("right")) {
			loginForm.style.right="100%"
			loginForm.dataset.animation="left"
			loginArrow.style.transform="rotate(0)"

			return
		}
		if (loginForm.dataset.animation.includes("left")) {
			
			loginForm.style.right="-100%"
			loginArrow.style.transform="rotate(180deg)"
			loginForm.dataset.animation="right"
			return
		}
		if (!loginForm.dataset.animation) {

			loginForm.style.right="100%"
			loginForm.dataset.animation="left"
			loginArrow.style.transform="rotate(0)"

			return

		}
		
		
	})

	const signBtn = document.getElementById('signup-btn')
	const signForm = document.getElementById('signup-form')
	const signArrow = document.getElementById('signup-arrow')
	
	signBtn.addEventListener("click",e=>{

		signForm.style.right="0"

	})

	signArrow.addEventListener("click",e=>{
		if (signForm.dataset.animation.includes("right")) {
			signForm.style.right="100%"
			signForm.dataset.animation="left"
			signArrow.style.transform="rotate(0)"

			return
		}
		if (signForm.dataset.animation.includes("left")) {
			
			signForm.style.right="-100%"
			signArrow.style.transform="rotate(180deg)"
			signForm.dataset.animation="right"
			return
		}
		if (!signForm.dataset.animation) {

			signForm.style.right="100%"
			signForm.dataset.animation="left"
			signArrow.style.transform="rotate(0)"

			return

		}
	})
}

export {
	toggleForm
}