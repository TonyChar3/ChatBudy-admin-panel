import { Link, Outlet } from 'react-router-dom';

const NavBar = () => {
    return(
        <>
            <div className="lg:flex lg:flex-row">
                <div className="absolute bottom-10 lg:static w-screen lg:w-[3%] lg:h-screen flex flex-col justify-center items-center z-10">
                    <div className="bottom-10 right-0 w-5/6 lg:w-full lg:h-full bg-white flex flex-row lg:flex-col justify-between items-center p-2 rounded-2xl lg:rounded-none border-[1px] border-[#33b8b8] shadow-md shadow-[#33b8b8]">
                        <div className="w-2/5 lg:h-1/4 flex flex-row lg:flex-col justify-around items-center">
                            <Link to="/navbar/visitors" className="duration-100 ease-in-out active:scale-[0.90]"><i className="fa-solid fa-people-simple text-3xl text-[#33b8b8]"></i></Link>
                            <Link to="/navbar/inbox" className="duration-100 ease-in-out active:scale-[0.90]"><i className="fa-regular fa-inbox text-3xl text-[#33b8b8]"></i></Link>
                        </div>
                        <div className="w-2/5 flex flex-row lg:flex-col lg:h-1/5 justify-around items-center">
                            <Link to="/navbar/notifications"><i className="fa-regular fa-bell text-3xl text-[#33b8b8] duration-100 ease-in-out active:scale-[0.90]"></i></Link>
                            <Link to="/navbar/setting" className="duration-100 ease-in-out active:scale-[0.90]"><i className="fa-light fa-gears text-3xl text-[#33b8b8]"></i></Link>
                        </div>
                    </div>
                </div>
                <Outlet />
            </div>

        </>

    );
}

export default NavBar;