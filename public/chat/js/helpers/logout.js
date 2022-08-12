const logout =  () =>{

	document.addEventListener("click",async e=>{
		if (e.target.id!="log-out") return

		const url = window.origin+"/api/auth/logout"
		
		const res = await fetch(url,{
				method:"POST",
				headers:{
					"Content-Type": "application/json; charset=utf-8",
				}
		})

		if (res.status>=200&&
			res.status<300){

			window.location="/app/chat"
		}

	})
}

export{
	logout
}