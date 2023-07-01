
const Scroll = (props) => {
    return(
        <>
            <div className="overflow-y-auto max-h-full w-full scroll-container">
                {props.children}
            </div>
        </>
    );
}

export default Scroll;