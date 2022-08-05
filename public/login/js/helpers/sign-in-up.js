const signIn = () => {
	
}

const signUp = () => {
	const emailInput = document.getElementById("signup-email")
	const passwordInput = document.getElementById("signup-password")
	const signupInput = document.getElementById("signup-username")
	const signupInputContainer = document.getElementById("signup-username-container")
	const spinner = document.getElementById("spinner-image")
	const checkedIcon = document.getElementById("cheked-image")

	let counter = 2
	let intervalId = false;

	const checkUsername = async ()=>{
		if (counter>0) return
		if (!(signupInput.value.length>0)){
			spinner.style.display="none"
			signupInputContainer.style.outline="none"
			checkedIcon.style.display="none"

			return
		}
		console.log("Working")

		const url = `${window.location.origin}/api/search/username/${signupInput.value}` 
		const res = await fetch(url,{
		    			method:"GET",
		    			headers:{
		  				"Content-Type": "application/json; charset=utf-8",
		  			}
		    	})
		const data = await res.json()
		console.log(data)
		if (!data.results){
			signupInputContainer.style.outline="none"
			signupInputContainer.style.outline="0.3rem solid #00ff00"
			checkedIcon.style.display="block"
			spinner.style.display="none"
		}

		if (data.results){
			signupInputContainer.style.outline="none"
			signupInputContainer.style.outline="0.3rem solid #ff0000"
			spinner.style.display="none"
		}

	}

	signupInput.addEventListener("input", async (e)=>{

		counter=2

		if (intervalId) clearInterval(intervalId)

		signupInputContainer.style.outline="0.3rem solid yellow"
		checkedIcon.style.display="none"

		intervalId = setInterval(async()=>{
			console.log(counter)

			spinner.style.display="block"

			
			counter=counter-1;
			if (counter<0) {
				clearInterval(intervalId);
				await checkUsername()
				intervalId=false
			};
		},500) 

	})


}

const sessions = () => {
	signUp()
	signIn()
}

export {
	sessions
}