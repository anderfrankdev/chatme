function toggleForm() {
	const loginBtn = document.getElementById('login-btn')
	const loginForm = document.getElementById('login-form')
	const loginArrow = document.getElementById('login-arrow')

	loginBtn.addEventListener("click",e=>{

		if (loginForm.classList.contains("animation-form-out")) {
			
			loginForm.classList.replace("animation-form-out","animation-form-in")

		}
		if (!loginForm.classList.contains("animation-form-in")) {

			loginForm.classList.add("animation-form-in")
		}
	})
	loginArrow.addEventListener("click",e=>{
		loginForm.classList.replace("animation-form-in","animation-form-out")
	})

	const signBtn = document.getElementById('sign-btn')
	const signForm = document.getElementById('sign-form')
	const signArrow = document.getElementById('sign-arrow')

	signBtn.addEventListener("click",e=>{

		if (signForm.classList.contains("animation-form-out")) {
			
			signForm.classList.replace("animation-form-out","animation-form-in")

		}
		if (!signForm.classList.contains("animation-form-in"))
			signForm.classList.add("animation-form-in")
	})
	signArrow.addEventListener("click",e=>{
		signForm.classList.replace("animation-form-in","animation-form-out")
	})
}

export {
	toggleForm
}