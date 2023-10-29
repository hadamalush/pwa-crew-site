export const handleScroll = state => {
	const styleBody = document.createElement("style");
	styleBody.innerHTML = `:root,body { overflow-y: ${state} }`;
	document.head.appendChild(styleBody);
};
