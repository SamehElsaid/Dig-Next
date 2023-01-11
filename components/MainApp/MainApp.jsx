import React, { useEffect, useRef, useState } from 'react';
import HeaderApp from '../HeaderApp/HeaderApp';

const MainApp = ({ children }) => {
    const header = useRef()
    const section = useRef()
    const footer = useRef()
    const [heightHeader, setHeightHeader] = useState(false)
    const [heightfooter, setHeightFooter] = useState(false)
    // useEffect(() => {
    //     setHeightHeader(header.current.offsetHeight)
    //     setTimeout(() => {
    //         setHeightFooter(footer.current.offsetHeight)
    //         section.current.style.minHeight  = `calc(100vh - 2.5rem - ${heightHeader}px)`
    //         if (heightfooter) {

    //         }
    //     }, 10)
    // }, [heightHeader, heightfooter])
    return (
        <div className='flex flex-col md:grid min-h-screen'>
            <div className="self-start w-full" >
                <HeaderApp />
            </div>
            <section className='sectionControl w-full' >
                {children}
            </section>
            {/* {heightHeader ?
                : 
                <div className="py-40 || flex || justify-center"><div className="w-14   || h-14 || border-t-4 || border-l-0 || animate-spin || border-mainColor || rounded-full"></div></div>
            } */}
            <footer className='bg-[#232f3e] w-full mt-auto md:mt-0 || self-end  || text-white || text-center || py-4' ref={footer}>&copy; 2022 All Right Reserved For Sameh Elsaid</footer>
        </div>
    );
};

export default MainApp;