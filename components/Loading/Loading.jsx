import React, { memo } from 'react';

const Loading = memo(() => {
    return (
        <div className="flex justify-center h-[280px] items-center w-full">
            <div className="py-30 || flex w-full || justify-center"><div className="w-14   || h-14 || border-t-4 || border-l-0 || animate-spin || border-mainColor || rounded-full"></div></div>
        </div>
    );
});

export default Loading;