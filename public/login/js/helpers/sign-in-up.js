const signIn = () => {
	
}

const signUp = () => {
	const emailInput = document.getElementById("signup-email")
	const passwordInput = document.getElementById("signup-password")
	const usernameInput = document.getElementById("signup-username")
	const usernameInputContainer = document.getElementById("signup-username-container")
	const emailInputContainer = document.getElementById("signup-username-container")

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

			return
		}

		

		if (inputType!="password") {
			
			if (inputType=="email") {
				const regExp = /^[a-zA-Z0-9]+[@]+[a-zA-Z0-9]+[.]+[a-zA-Z0-9]+$/
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
		
		console.log("Working")
		
		console.log(data)
		if (!data.results){
			inputContainer.style.outline="none"
			inputContainer.style.outline="0.3rem solid #00ff00"

			valid.style.display="block"
			spinner.style.display="none"
			input.dataset.valid="true"
		}

		if (data.results){
			inputContainer.style.outline="none"
			inputContainer.style.outline="0.3rem solid #ff0000"
			spinner.style.display="none"
			invalid.style.display="block"
		}
		counter=2
	}

	const checkFieldEventHandler = async (inputType,inputContainer)=>{
		
		counter=2

		inputContainer.style.outline="0.3rem solid yellow"
		
		inputContainer
			.querySelector(".valid").style.display="none"

		inputContainer
			.querySelector(".invalid").style.display="none"

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
		},500)
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

const sessions = () => {
	signUp()
	signIn()
}

export {
	sessions
}