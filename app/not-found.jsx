import Link from 'next/link';

export default function NotFound() {
    return (
    <section className="pt-16 w-full h-screen flex-items">
        <div className="container">
            <div className="row">	
            <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
            <div className="four_zero_four_bg">
                <h1 className="text-center text-[80px]">404</h1>
            </div>
            
            <div className="text-gray-500 mt-[-50px] flex-items flex-col">
                <h3 className="h2">
                Look like you're lost
                </h3>
                
                <p>the page you are looking for not avaible!</p>
                
                <a href="/" className="flex-items w-fit px-4 py-2 bg-green-600 text-white rounded-[25px] hover:bg-green-500 transition mt-4">Go to Home</a>
            </div>
            </div>
            </div>
            </div>
        </div>
    </section>
    );
}