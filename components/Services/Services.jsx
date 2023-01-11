import React, { memo } from 'react';
import { TbBus } from "react-icons/tb"
import { AiOutlineGift } from "react-icons/ai"
import { CiHeadphones ,CiPercent} from "react-icons/ci"
import { TfiWindow} from "react-icons/tfi"
const Services = memo(() => {
    return (
        <div className='bg-gray-100 py-10'>
            <div className="container">
                <div className="flex || items-center || flex-wrap || justify-center  || gap-10">
                    <div className="flex || items-center || gap-4 ||  lg:w-[calc(20%)]">
                        <div className="text-4xl">
                            <TbBus />
                        </div>
                        <div className="">
                            <h2>Free Shipping</h2>
                            <p>From all order over 5$</p>
                        </div>
                    </div>
                    <div className="flex || items-center || gap-4 ||  lg:w-[calc(20%-2.5rem)]">
                        <div className="text-4xl">
                            <AiOutlineGift />
                        </div>
                        <div className="">
                            <h2>Daily Surprise</h2>
                            <p>Save upto 25% off</p>
                        </div>
                    </div>
                    <div className="flex || items-center || gap-4 ||  lg:w-[calc(20%-2.5rem)]">
                        <div className="text-4xl">
                            <CiHeadphones />
                        </div>
                        <div className="">
                            <h2>Support 24/7</h2>
                            <p>Shop with an expert</p>
                        </div>
                    </div>
                    <div className="flex || items-center || gap-4 ||  lg:w-[calc(20%-2.5rem)]">
                        <div className="text-4xl">
                            <CiPercent />
                        </div>
                        <div className="">
                            <h2>Offerdable Price</h2>
                            <p>Get Fetory Default Price</p>
                        </div>
                    </div>
                    <div className="flex || items-center || gap-4 ||  lg:w-[calc(20%-2.5rem)]">
                        <div className="text-4xl">
                            <TfiWindow />
                        </div>
                        <div className="">
                            <h2>Secure Payments</h2>
                            <p>100% protected payments</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Services;