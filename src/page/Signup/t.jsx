import { Link } from 'react-router-dom'


const Signup = () => {
    return (
        <div>
            <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-blur-sm bg-opacity-30 relative">
                <h1 className="text-4xl text-whitefont-bold text-center mb-6"> Sign Up</h1>
                <form action="">
                    <div className="relative my-4">
                        <input type="email" className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder=""/>
                        <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z- origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:darl:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peeer-focus:scale-75 peer-focus:-translate-y-6 ">
                            Email
                        </label>
                    </div>
                    <div className="relative my-4">
                        <input type="email" className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder=""/>
                        <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z- origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:darl:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peeer-focus:scale-75 peer-focus:-translate-y-6 ">
                            Full Name
                        </label>
                    </div>
                    <div className="relative my-4">
                        <input type="password" className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder=""/>
                        <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z- origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:darl:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peeer-focus:scale-75 peer-focus:-translate-y-6 ">
                            PassWord
                        </label>
                    </div>
                    <div className="relative my-4">
                        <input type="password" className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder=""/>
                        <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z- origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:darl:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peeer-focus:scale-75 peer-focus:-translate-y-6 ">
                            Confirm PassWord
                        </label>
                    </div>
                    <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300" type='submit'>
                        SignUp
                    </button>
                    <div>
                        <span className="m-4">
                            Already Create an Account?
                            <Link className="text-blue-500" to='/login'> Login</Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;
