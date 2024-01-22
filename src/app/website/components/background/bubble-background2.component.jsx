const BubbleBackground2 = ({ children, style }) => {
  return (
    <>
      <div className="relative w-full h-full flex flex-col lg:flex-row items-center">
        <div
          className={`hidden lg:block absolute ${style.first_bubble_container} animate-float`}
        >
          <div
            className={`${style.first_bubble} bg-[#FDFAFF] z-5 rounded-full`}
          ></div>
        </div>
        {children}
        <div
          className={`hidden lg:block absolute ${style.second_bubble_container} animate-float`}
        >
          <div
            className={`${style.second_bubble} bg-[#FDFAFF] z-5 rounded-full`}
          ></div>
        </div>
      </div>
    </>
  );
};

export default BubbleBackground2;
