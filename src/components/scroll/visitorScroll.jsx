
const VisitorScroll = (props) => {
    return(
        <>
            <div className="overflow-y-auto h-full w-full scroll-container">
                {props.children}
            </div>
        </>
    );
}

export default VisitorScroll;