"use client"
import Head from 'next/head';

const IndexPage = () => {
    return (
        <div>
            <Head>
                <title>Find Seeds, Chemicals, Pesticides, and Equipments</title>
                <meta name="description" content="Find Seeds, Chemicals, Pesticides, and Equipments" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="text-black py-4 text-center">
                <h1 className="text-xl font-bold">Find Seeds, Chemicals, Pesticides, and Equipments</h1>
            </header>

            <main>

            <div className="flex justify-center items-center w-screen border border-gray-600 rounded-lg" style={{ width: '250px', height: '60px', margin: 'auto', position: 'relative' }}>
    <button className="pr-6">Button 1</button>
    
        <button className="">Button 2</button>
        <div className="absolute top-0 bottom-0 bg-gray-600 w-px" style={{ left: '50%', transform: 'translateX(-50%)'}}></div>
  
</div>

            </main>

        </div>
    );
};

export default IndexPage;
