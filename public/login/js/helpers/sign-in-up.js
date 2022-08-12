const signIn = (form) => {
	
	const emailInput = form.querySelector("#signin-email")
	const passwordInput = form.querySelector("#signin-password")

	form.addEventListener("submit", async(e)=>{
		e.preventDefault()
		console.log(!(emailInput.value.length>0&&
		passwordInput.value.length>0))
		
		if (!(emailInput.value.length>0&&
		passwordInput.value.length>0)) return

		//console.log("Working")

		const userData = {
			email:emailInput.value,
			password:passwordInput.value,
			type:"session"
		}

		const url = `${window.location.origin}/api/auth/login` 
			
		const res = await fetch(url,{
				method:"POST",
				headers:{
					"Content-Type": "application/json; charset=utf-8",
				},
				body:JSON.stringify(userData)
		})
		console.log(res)
		if (res.status>=200&&
			res.status<300){
			emailInput.value  = ""
			passwordInput.value = ""
			window.location.pathname="/app/chat"
		}

	})
}

const validateSignUpForm=(form)=>{
	const emailInput = form.querySelector("#signup-email")
	const passwordInput = form.querySelector("#signup-password")
	const usernameInput = form.querySelector("#signup-username")
	const usernameInputContainer = form.querySelector("#signup-username-container")
	const emailInputContainer = form.querySelector("#signup-username-container")

	let counter = 2
	let intervalId = false;

	const checkField = async (inputType,inputContainer)=>{

		if (inputType!="username"&&
			inputType!="email" &&
			inputType!="password") return

		const input = inputContainer.querySelector("input")
		const spinner = inputContainer.querySelector(".spinner")
		const invalid = inputContainer.querySelector(".invalid")
		const valid = inputContainer.querySelector(".valid")
		let data;

		input.dataset.valid=""


		if (!(input.value.length>0)){
			spinner.style.display="none"
			inputContainer.style.outline="none"
			valid.style.display="none"
			invalid.style.display="none"

			return
		}

		

		if (inputType!="password") {

			inputContainer.style.outline="0.3rem solid yellow"
		
			valid.style.display="none"

			invalid.style.display="none"

			spinner.style.display="block"


			if (inputType=="email") {
				const regExp = /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/
				if (!regExp.test(input.value)) {
					inputContainer.style.outline="none"
					inputContainer.style.outline="0.3rem solid #ff0000"
					spinner.style.display="none"
					invalid.style.display="block"
					return
				}	
			}
			
			const url = `${window.location.origin}/api/search/${inputType}/${input.value}` 
			
			const res = await fetch(url,{
			    			method:"GET",
			    			headers:{
			  				"Content-Type": "application/json; charset=utf-8",
			  			}
			    	})
			data = await res.json()
		}

		if (inputType=="password") {
			data={results:true}
			if (input.value.length>=6){
				data={results:false}
			}
		}
		
		//console.log("Working")
		
		//console.log(data)
		if (!data.results){
			inputContainer.style.outline="none"
			inputContainer.style.outline="0.3rem solid #00ff00"

			valid.style.display="block"
			invalid.style.display="none"
			spinner.style.display="none"
			input.dataset.valid="true"
		}

		if (data.results){
			inputContainer.style.outline="none"
			inputContainer.style.outline="0.3rem solid #ff0000"
			spinner.style.display="none"
			invalid.style.display="block"
			valid.style.display="none"
		}
		counter=2
	}

	const checkFieldEventHandler = async (inputType,inputContainer)=>{

		if (inputType=="password") {
			await checkField(inputType,inputContainer)
			return
		}

		inputContainer.style.outline="0.3rem solid yellow"
		
		inputContainer.querySelector(".valid")
			.style.display="none"

		inputContainer.querySelector(".invalid")
			.style.display="none"
		
		counter=2

		intervalId = setInterval(async()=>{
			
			console.log(counter)

			inputContainer
				.querySelector(".spinner").style.display="block"

			
			counter=counter-1;
			if (counter<0) {
				
				clearInterval(intervalId);
				
				await checkField(inputType,inputContainer)

				intervalId=false
			};
		},250)
	};

	[emailInput, usernameInput].forEach(async input =>{
		
		input.addEventListener("input", async (e)=>{
			clearInterval(intervalId);
			
			const inputContainer = input.parentElement
			

			if (counter==0||counter<0){
				
				console.log("happend")

				await checkField(
					inputContainer.dataset.type,
					inputContainer
				)
				counter=2
				return
			}
			counter=2
			

			
			

			await checkFieldEventHandler(
					inputContainer.dataset.type,
					inputContainer
				) 
			
			return

		})
	
	});

	
	passwordInput.addEventListener("input",async e=>{
		
		clearInterval(intervalId);
			
			const inputContainer = passwordInput.parentElement
			

			if (counter==0||counter<0){
				
				console.log("happend")
				await checkField(
					inputContainer.dataset.type,
					inputContainer
				)
				counter=2
				return
			}
			counter=2
			

			
			

			await checkFieldEventHandler(
					inputContainer.dataset.type,
					inputContainer
				) 
			
			return
	})
}

const saveUserData=(form)=>{
	const emailInput = form.querySelector("#signup-email")
	const passwordInput = form.querySelector("#signup-password")
	const usernameInput = form.querySelector("#signup-username")

	form.addEventListener("submit", async(e)=>{
		e.preventDefault()
		if (!(emailInput.dataset.valid&&
		passwordInput.dataset.valid&&
		usernameInput.dataset.valid)) return

		//console.log("Working")

		const userData = {
			email:emailInput.value,
			password:passwordInput.value,
			username:usernameInput.value,

		}

		const url = `${window.location.origin}/api/users` 
			
		const res = await fetch(url,{
				method:"POST",
				headers:{
					"Content-Type": "application/json; charset=utf-8",
				},
				body:JSON.stringify(userData)
		})
		
		if (res.status>=200&&
			res.status<300){

			emailInput.value  = ""
			passwordInput.value = ""
			usernameInput.value = ""

			const url = `${window.location.origin}/api/auth/login` 
			
			const res2 = await fetch(url,{
					method:"POST",
					headers:{
						"Content-Type": "application/json; charset=utf-8",
					},
					body:JSON.stringify({
						email:userData.email,
						password:userData.password,
						type:"session"
					})
			})

			if (res2.status>=200&&
			res2.status<300){
				window.location="/app/chat"
			}
		}
	})	
}

const signUp = (form) => {
	validateSignUpForm(form)
	saveUserData(form)
}

const sessions = () => {
	const signForm = document.getElementById("signup-form")
	signUp(signForm)

	const logForm = document.getElementById("login-form")

	signIn(logForm)
}

export {
	sessions
}