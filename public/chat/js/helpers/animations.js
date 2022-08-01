import {
	boundSelectMessage,
	boundUnselectMessage,
	boundUnselectSeveral,
} from '../state/actions.js'

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

	document.addEventListener("click",e=>{
		if (e.target.parentElement.id!="option-menu") return
		if (e.target.id=="contact-info") {
			
			if (!window.matchMedia("(max-width: 31.25em)").matches) {
				chat.style.width="50%"
				contactInfo.style.width="50%"
			}
			if (window.matchMedia("(max-width: 31.25em)").matches) {
				chat.style.width="0"
				contactInfo.style.width="100%"
			}
		}
	})

	const closeInfo = document.getElementById("close-contact-info");

	closeInfo.addEventListener("click",e=>{
		if(window.matchMedia("(max-width: 31.25em)").matches) return

		chat.style.width="100%"
		contactInfo.style.width="0"
	});
	
}

const displayOptionalInfo = ( ) => {

	const userPhoto 	 = document.getElementById("user-photo");
	const newMessageIcon = document.getElementById("new-message");
	const userProfile    = document.getElementById("user-profile");
	const searchUser     = document.getElementById("search-user");
	const sentPhotos     = document.getElementById("contact-sent-photos");
	const contactPhotosTitleToClick  = document.getElementById("contact-photos-title");
	const staredMessagesTitleToClick = document.getElementById("contact-fav-msgs");
	const staredMessagesContainer    = document.getElementById("contact-starred-messages");

	newMessageIcon.addEventListener("click",e=>{

		searchUser.style.top="0"
	})

	contactPhotosTitleToClick.addEventListener("click",e=>{

		sentPhotos.style.top="0"
	})

	userPhoto.addEventListener("click",e=>{

		userProfile.style.top="0"
	})

	staredMessagesTitleToClick.addEventListener("click",e=>{

		staredMessagesContainer.style.top="0"
	})

	
	const closeInfo = document.getElementById("close-user-info");
	const closeSearch = document.getElementById("close-user-search");
	const closePhotos = document.getElementById("close-contact-photos");
	const closeStarred = document.getElementById("close-starred-messages")
	
	closeStarred.addEventListener("click",e=>{
		staredMessagesContainer.style.top="105%"
	})

	closeSearch.addEventListener("click",e=>{
		searchUser.style.top="110%"
	})
	
	closeInfo.addEventListener("click",e=>{

		userProfile.style.top="110%"
	});

	closePhotos.addEventListener("click",e=>{

		sentPhotos.style.top="110%"
	});




	
}
const getParent = (e,parentClass) => {

	let parent;

	parent = e.target

	while(!parent.matches(`.${parentClass}`)){

		parent = parent.parentElement

	}
	return parent
}
const displayOptionMenu = () => {
	

	

	const root = document.getElementById("root")

	const optionMsgIcons = document.querySelectorAll(".options-msg")
	const messages = document.querySelectorAll(".msg-container")

	const optionChatIcons = document.querySelectorAll(".chat-options")
	const chatCards = document.querySelectorAll(".chat-card")
	const userOptions = document.getElementById("user-options")
	const contactOptions = document.getElementById("contact-options")
	
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
						<p class="option" id="${option.toLowerCase().replace(" ","-")}">${option}</p>
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
				actions(
					["Archive","Disable notifications","Unpin","Delete"],
					"chat-card"
				)
			)
		});

		userOptions.addEventListener("click",e=>{
			return actions(
				["New group","Starred messages","Settings","Log out"],
				"header"
			)(e)
		})

		contactOptions.addEventListener("click",e=>{
			return actions(
				[	
					"Contact info",
					"Select messages",
					"Close chat",
					"Mute notifications",
					"Disappearing messages",
					"Clear messages",
					"Delete chat"
				],
				"header"
			)(e)
		})

}

const checkClasses = (e,classes)=>{
	let hasClass = false
	classes.forEach(c=>{
		if(e.target.matches(`.${c}`)) hasClass = true
	})
	return hasClass
}

const deleteOptionMenu = () => {
	
	

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
				optionMenu.remove()
		}

		return
	})
	

}

const displayChatMobile = () => {
	
	const chatCards = document.querySelectorAll(".chat-card")
	const aside = document.getElementById("aside")
	const chat = document.getElementById("chat-container")

	chatCards.forEach(el=>{
		el.addEventListener("click",e =>{
			console.log()
			if(!window.matchMedia("(max-width: 31.25em)").matches) return
			if (e.target.matches(".chat-options")) {
				return
			}
			aside.style.left= "150%";
			chat.style.left= "0";
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

		aside.style.left= "0";
		chat.style.left= "150%";
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

	window.addEventListener("resize",()=>{
		if(window.matchMedia("(max-width: 31.25em)").matches) return
		if(aside.style.left== "0px"&chat.style.left== "0px") return
		aside.style.left= "0";
		chat.style.left= "0";
		console.log("resize")
	})
	
}

const selectMessages=(store = Redux.createStore())=>{
	
	const messages = document.querySelectorAll(".message")
	const messageContainer = document.getElementById("messages-container")
	const count = document.getElementById("selected-messages-count")
	
	messages.forEach(message=>{
		message.addEventListener("click",e=>{
			
			if (messageContainer.dataset.mode!="select-messages") return

			const parent = getParent(e,"message")

			const checkbox = parent.querySelector(".select-message")

			if(e.target==checkbox) return
			
			
			if(!checkbox.checked){
				parent.style.background="#bb55ee22"
				checkbox.checked=true
				boundSelectMessage(parent.id,store)
				count.innerHTML = `${store.getState().selectedMessages.size} selected`
				return
			}
			if (checkbox.checked) {
				parent.style.background="#fff"	
				checkbox.checked=false
				boundUnselectMessage(parent.id,store)
				count.innerHTML = `${store.getState().selectedMessages.size} selected`
				return
			}
		})
	})
	
	const selectionCloseButton = document.getElementById("close-selected-messages")
	const selectionActions =document.getElementById("selection-actions")
	const messageCheckboxes = document.querySelectorAll(".select-message")

	selectionCloseButton.addEventListener("click",e=>{
		selectionActions.style.top="150%"
		messageContainer.dataset.mode="chat"
		boundUnselectSeveral("ALL",store)
		count.innerHTML = `${store.getState().selectedMessages.size} selected`
		messageCheckboxes.forEach(checkbox=>{
			checkbox.style.width="0";
			checkbox.checked=false
		})

		messages.forEach(message=>{
			message.style.background="#fff"
		})
	})

	document.addEventListener("click",e=>{

		if (e.target.id!="select-messages") return
		messageContainer.dataset.mode="select-messages"

		selectionActions.style.top="0"

		
		messageCheckboxes.forEach(checkbox=>{
			checkbox.style.width="1.3rem"
			checkbox.addEventListener("click",e=>{
				if(e.target.checked){
					e.target.parentElement.style.background="#bb55ee22"
					boundSelectMessage(parent.id,store)
					count.innerHTML = `${store.getState().selectedMessages.size} selected`
				}
				if (!e.target.checked) {
					e.target.parentElement.style.background="#fff"
					boundUnselectMessage(parent.id,store)
					count.innerHTML = `${store.getState().selectedMessages.size} selected`
				}
			})
		})
	})

}


const animations = (store=Redux.createStore()) => {

	displayContactInfo()
	displayOptionalInfo()
	
	deleteOptionMenu()
	displayOptionMenu()
	displayChatMobile()
	displayAsideMobile()
	displayContactMobile()
	selectMessages(store)
}

export {
	animations
}