const displayContactInfo = ( ) => {

	const contactPhoto = document.getElementById("contact-photo");
	const contactName = document.getElementById("chatting-contact-name");
	const chat = document.getElementById("chat");
	const contactInfo = document.getElementById("contact-info");

	[contactPhoto,contactName].forEach((el)=>{
		
		el.addEventListener("click",e=>{
			chat.style.width="50%"
			contactInfo.style.width="50%"
		})

	});

	const closeInfo = document.getElementById("close-contact-info");

	closeInfo.addEventListener("click",e=>{
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

const animations = () => {
	displayContactInfo()
	displayUserInfo()
}

export {
	animations
}