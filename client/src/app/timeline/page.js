import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';

const App = () => (
    <>
        <div className='w-full h-[100%] flex flex-col justify-center items-center px-[40px]'>
            <p className='text-green-600 text-[30px] font-semibold my-[55px]'>CROP PLANNING</p>
            <Timeline
                items={[
                    {
                        color: 'green',
                        children: <p className="text-[17px]">Create a services site 2015-09-01</p>,
                    },
                    {
                        color: 'green',
                        children: <p className="text-[17px]">Create a services site 2015-09-01</p>,
                    },
                    {
                        color: 'green',
                        children: (
                            <>
                                <p className="text-[19px] font-semibold text-green-600">Solve initial network problems 1</p>
                                <p className="text-[17px]">Solve initial network problems 2</p>
                                <p className="text-[17px]">Solve initial network problems 3 2015-09-01</p>
                            </>
                        ),
                    },
                    {   color: 'green',
                        children: (
                            <>
                                <p className="text-[19px] font-semibold text-green-600">Technical testing 1</p>
                                <p className="text-[17px]">Technical testing 2</p>
                                <p className="text-[17px]">Technical testing 3 2015-09-01</p>
                            </>
                        ),
                    },
                    {
                        color: 'green',
                        children: (
                            <>
                                <p className="text-[19px] font-semibold text-green-600">Technical testing 1</p>
                                <p className="text-[17px]">Technical testing 2</p>
                                <p className="text-[17px]">Technical testing 3 2015-09-01</p>
                            </>
                        ),
                    },
                    {
                        color: 'green',
                        children: (
                            <>
                                <p className="text-[19px] font-semibold text-green-600">Technical testing 1</p>
                                <p className="text-[17px]">Technical testing 2</p>
                                <p className="text-[17px]">Technical testing 3 2015-09-01</p>
                            </>
                        ),
                    },
                    {
                        color: '#00CCFF',
                        dot: <SmileOutlined />,
                        children: <p className="text-2xl">Custom color testing</p>,
                    },
                ]}
            />
        </div>
    </>
);

export default App;
