
const Scroll = (props) => {
    return(
        <>
            <div className="overflow-y-auto max-h-[90vh] w-full">
                {props.children}
            </div>
        </>
    );
}

export default Scroll;