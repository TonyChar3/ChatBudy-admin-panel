

const InboxScroll = (props) => {
    return(
        <>
            <div className="overflow-y-auto h-[98%] w-full scroll-container">
                {props.children}
            </div>
        </>
    );
}

export default InboxScroll;