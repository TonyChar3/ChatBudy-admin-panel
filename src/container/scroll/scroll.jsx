
const Scroll = (props) => {
    return(
        <>
            <div className="overflow-y-auto h-[98%] w-full">
                {props.children}
            </div>
        </>
    );
}

export default Scroll;