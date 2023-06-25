
const visitorScroll = (props) => {
    return(
        <>
            <div className="overflow-y-auto max-h-[90vh] w-full scroll-container">
                {props.children}
            </div>
        </>
    );
}

export default visitorScroll;