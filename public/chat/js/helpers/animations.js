const displayContactInfo = ( ) => {

	const contactPhoto = document.getElementById("contact-photo");
	const contactName = document.getElementById("chatting-contact-name");
	const chat = document.getElementById("chat");
	const contactInfo = document.getElementById("contact-info");

	[contactPhoto,contactName].forEach((el)=>{
		if(window.matchMedia("(max-width: 31.25em)").matches) return
		el.addEventListener("click",e=>{
			chat.style.width="50%"
			contactInfo.style.width="50%"
		})

	});

	const closeInfo = document.getElementById("close-contact-info");

	closeInfo.addEventListener("click",e=>{
		if(window.matchMedia("(max-width: 31.25em)").matches) return

		chat.style.width="100%"
		contactInfo.style.width="0"
	});
	
}

const displayUserInfo = ( ) => {

	const userPhoto = document.getElementById("user-photo");
	const userProfile = document.getElementById("user-profile");
		
	userPhoto.addEventListener("click",e=>{

		userProfile.style.top="0"
	})

	
	const closeInfo = document.getElementById("close-user-info");

	closeInfo.addEventListener("click",e=>{
	

		userProfile.style.top="100%"
	});
	
}

const displayOptionMenu = () => {

	

	

	const getParent = (e,parentClass) => {

		let parent;

		parent = e.target.parentElement

		while(!parent.matches(`.${parentClass}`)){

			parent = parent.parentElement

		}

		return parent
	}

	const root = document.getElementById("root")

	const optionMsgIcons = document.querySelectorAll(".options-msg")
	const messages = document.querySelectorAll(".msg-container")

	const optionChatIcons = document.querySelectorAll(".chat-options")
	const chatCards = document.querySelectorAll(".chat-card")
	
	const actions = (options,parentClass) =>{



		return function function_name(e) {

				e.preventDefault()
				e.stopPropagation()

				const oldOptionMenu = document.querySelector(".options-container")

				if (oldOptionMenu) {
					oldOptionMenu.remove()
				}

				const optionMenu = document.createElement("div")
				optionMenu.classList.add("options-container")
				optionMenu.id="option-menu"

				options.forEach(option=>{
					optionMenu.innerHTML+=
					`
						<p class="option" id="${option.toLowerCase()}">${option}</p>
					`
				})

				root.insertAdjacentElement("beforeend",optionMenu)

				optionMenu.style.top = `${
					e.clientY>root.clientHeight*2/3?
				 	e.clientY - optionMenu.clientHeight: 
				 	e.clientY}px`

				optionMenu.style.left = `${
					e.clientX>root.clientWidth*0.8335?
				 	e.clientX - optionMenu.clientWidth: 
				 	e.clientX}px`

				const optionId = getParent(e,parentClass).id
				console.log(optionId)
				optionMenu.dataset.optionid = optionId
				optionMenu.dataset.functionality = parentClass
				
			}
		}

		
		optionMsgIcons.forEach(optionIcon=>{
			optionIcon.addEventListener("click", 
				actions(["Reply","Resend","Highlight","Delete"],
				"message"))
		});

		messages.forEach(message=>{
			message.addEventListener("contextmenu", 
				actions(["Reply","Resend","Highlight","Delete"],
						"message"))
		});


		optionChatIcons.forEach(optionChatIcon=>{
			optionChatIcon.addEventListener("mouseup", 
				actions(["Archive","Disable notifications","unpin up","Delete"],
						"chat-card"))
				
		});

		chatCards.forEach(card=>{
			card.addEventListener("contextmenu", 
				actions(["Archive","Disable notifications","Unpin","Delete"],
						"chat-card"))
		});

}

const deleteOptionMenu = () => {
	
	const checkClasses = (e,classes)=>{
		let hasClass = false
		classes.forEach(c=>{
			if(e.target.matches(`.${c}`)) hasClass = true
		})
		return hasClass
	}

	const allowedClasses=
	["options-msg",
	"chat-options",
	"options-icon"]
	
	const root = document.getElementById("root")
	document.addEventListener("click",e=>{

		const optionMenu = document.querySelector(".options-container")
		if (!optionMenu) return

		optionMenu.contains(e.target)
		if (optionMenu && !checkClasses(e,["options-msg","chat-options"])){

			if (!optionMenu.contains(e.target)) {
				optionMenu.remove()
			}
		
		}

		return
	})
	

}

const displayChatMobile = () => {
	
	const chatCards = document.querySelectorAll(".chat-card")
	const aside = document.getElementById("aside")
	const chat = document.getElementById("chat-container")
	console.log(chatCards)
	chatCards.forEach(el=>{
		el.addEventListener("click",e =>{
			console.log()
			if(!window.matchMedia("(max-width: 31.25em)").matches) return
			aside.style.gridArea= "none";
			aside.style.display= "none";
			chat.style.gridArea= "main";
			chat.style.display="unset";
			console.log("Working")
		})
	})
	
}

const displayAsideMobile = ()=>{
	const arrow = document.getElementById("arrow-icon")
	const aside = document.getElementById("aside")
	const chat = document.getElementById("chat-container")

	arrow.addEventListener("click",e =>{
		console.log()
		if(!window.matchMedia("(max-width: 31.25em)").matches) return
		aside.style.gridArea= "main";
		aside.style.display= "unset";
		chat.style.gridArea= "none";
		chat.style.display="none";
		console.log("Working")
	})
}

const displayContactMobile = ( ) => {

	const contactPhoto = document.getElementById("contact-photo");
	const contactName = document.getElementById("chatting-contact-name");
	const chat = document.getElementById("chat");
	const contactInfo = document.getElementById("contact-info");

	[contactPhoto,contactName].forEach((el)=>{
		
		el.addEventListener("click",e=>{
			if(!window.matchMedia("(max-width: 31.25em)").matches) return
			chat.style.width="0"

			contactInfo.style.width="100%"

		})

	});

	const closeInfo = document.getElementById("close-contact-info");

	closeInfo.addEventListener("click",e=>{
		if(!window.matchMedia("(max-width: 31.25em)").matches) return

		chat.style.width="100%"
		contactInfo.style.width="0"

		
	});
	
}


const animations = () => {

	displayContactInfo()
	displayUserInfo()
	
	deleteOptionMenu()
	displayOptionMenu()
	displayChatMobile()
	displayAsideMobile()
	displayContactMobile()
}

export {
	animations
}

/*
<div class="options-container">
	<p class="option">Reply</p>
	<p class="option">Resend</p>
	<p class="option">Highlight</p>
	<p class="option">Delete</p>
</div>*/