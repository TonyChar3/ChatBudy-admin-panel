
const VisitorScroll = (props) => {
    return(
        <>
            <div className="overflow-y-auto max-h-[90%] w-full scroll-container flex flex-col justify-center items-center">
                {props.children}
            </div>
        </>
    );
}

export default VisitorScroll;