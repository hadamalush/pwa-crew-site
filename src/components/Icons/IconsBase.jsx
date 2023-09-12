export function IconsBase() {
	const ALL_ICONS = {
		youtube: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				className='feather feather-youtube'>
				<path d='M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z'></path>
				<polygon points='9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02'></polygon>
			</svg>
		),
		film: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				className='feather feather-film'>
				<rect x='2' y='2' width='20' height='20' rx='2.18' ry='2.18'></rect>
				<line x1='7' y1='2' x2='7' y2='22'></line>
				<line x1='17' y1='2' x2='17' y2='22'></line>
				<line x1='2' y1='12' x2='22' y2='12'></line>
				<line x1='2' y1='7' x2='7' y2='7'></line>
				<line x1='2' y1='17' x2='7' y2='17'></line>
				<line x1='17' y1='17' x2='22' y2='17'></line>
				<line x1='17' y1='7' x2='22' y2='7'></line>
			</svg>
		),
		powerOff: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				className='feather feather-power'>
				<path d='M18.36 6.64a9 9 0 1 1-12.73 0'></path>
				<line x1='12' y1='2' x2='12' y2='12'></line>
			</svg>
		),
		settings: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				className='feather feather-settings'>
				<circle cx='12' cy='12' r='3'></circle>
				<path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z'></path>
			</svg>
		),
		user: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				className='feather feather-user'>
				<path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
				<circle cx='12' cy='7' r='4'></circle>
			</svg>
		),
		event: (
			<svg
				version='1.1'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 512 512'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'>
				<path d='M160 192h64v64h-64zM256 192h64v64h-64zM352 192h64v64h-64zM64 384h64v64h-64zM160 384h64v64h-64zM256 384h64v64h-64zM160 288h64v64h-64zM256 288h64v64h-64zM352 288h64v64h-64zM64 288h64v64h-64zM416 0v32h-64v-32h-224v32h-64v-32h-64v512h480v-512h-64zM448 480h-416v-352h416v352z'></path>
			</svg>
		),
		calendar: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				className='feather feather-calendar'>
				<rect x='3' y='4' width='18' height='18' rx='2' ry='2'></rect>
				<line x1='16' y1='2' x2='16' y2='6'></line>
				<line x1='8' y1='2' x2='8' y2='6'></line>
				<line x1='3' y1='10' x2='21' y2='10'></line>
			</svg>
		),
		info: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				className='feather feather-info'>
				<circle cx='12' cy='12' r='10'></circle>
				<line x1='12' y1='16' x2='12' y2='12'></line>
				<line x1='12' y1='8' x2='12.01' y2='8'></line>
			</svg>
		),
	};

	return ALL_ICONS;
}
