const ScrollView = (props) => {
  return (
    <>
      <div
        className={`overflow-y-auto ${props.style} scroll-container`}
        onScroll={props.scroll_event}
      >
        {props.children}
      </div>
    </>
  );
};

export default ScrollView;
