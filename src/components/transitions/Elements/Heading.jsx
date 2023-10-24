/**
 * @example <Heading className='brown' as='h1'>Some text as children </Heading>
 * @param {String} className Enter className as string.
 * @param {String} as Enter one of heading - h1 h2 h3 h4 h5 h6.
 * @param {String} children Enter children as string.
 * @returns {JSX.Element} Returns heading tag.
 */

const Heading = ({ className, as, children }) => {
	const HeadingTag = as;

	return <HeadingTag className={className}>{children}</HeadingTag>;
};

export default Heading;
