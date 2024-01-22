
const Scroll = (props) => {
    return(
        <>
            <div className="overflow-y-auto max-h-screen h-full w-full scroll-container" onScroll={props.scroll_event}>
                {props.children}
            </div>
        </>
    );
}

export default Scroll;