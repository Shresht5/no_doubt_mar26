'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import DestroyStarsCanvas from '@/components/screen/DestroyStarsCanvas'

export default function LoginForm() {
    const [passwordShow, setPasswordShow] = useState(false);
    const [login, setLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const router = useRouter();

    const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.back();
    }

    async function formSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!login && password !== confirmPassword) {
            console.log('Passwords do not match');
            return;
        }
        console.log('loging');

    }
    async function googleSignIn() {
        window.location.href = "http://localhost:8000/api/google/login";
    }

    return (
        <DestroyStarsCanvas>
            <div className="relative h-screen flex justify-center items-center bg-cover bg-center">
                <form onSubmit={formSubmit} className="absolute bg-[rgba(255,255,255,0.15)] backdrop-blur-md p-8 sm:rounded-2xl space-y-6 w-[90%] sm:max-w-md shadow-lg">

                    {/* Back Arrow */}
                    <button type="button" onClick={handleBack} className="px-2">
                        <svg className='h-7 fill-white' viewBox="0 0 640 640">
                            <path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z" />
                        </svg>
                    </button>

                    {/* Title */}
                    <div className="px-2">
                        <h1 className="text-3xl  text-white tracking-wide">No Doubt</h1>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-5 px-2">

                        {/* Email */}
                        <label className="relative block">
                            <span className="absolute -top-3 left-2 text-white text-sm bg-[rgba(0,0,0,0.7)] px-1 rounded-md">
                                Email
                            </span>
                            <input
                                type="email"
                                name='email'
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                className="w-full p-3 text-white border border-white rounded-lg bg-transparent focus:border-blue-300 outline-none"
                            />
                        </label>

                        {/* Password */}
                        <label className="relative block">
                            <span className="absolute -top-3 left-2 text-white text-sm bg-[rgba(0,0,0,0.7)] px-1 rounded-md">
                                Password
                            </span>
                            <input
                                name='password'
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}

                                type={passwordShow ? "text" : "password"}
                                className="w-full p-3 text-white border border-white rounded-lg bg-transparent focus:border-blue-300 outline-none pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setPasswordShow(!passwordShow)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
                            >
                                {passwordShow ?
                                    <svg className='h-7 fill-white' viewBox="0 0 640 640">
                                        <path d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320zM320 256C320 291.3 291.3 320 256 320C244.5 320 233.7 317 224.3 311.6C223.3 322.5 224.2 333.7 227.2 344.8C240.9 396 293.6 426.4 344.8 412.7C396 399 426.4 346.3 412.7 295.1C400.5 249.4 357.2 220.3 311.6 224.3C316.9 233.6 320 244.4 320 256z" />
                                    </svg>
                                    :
                                    <svg className='h-7 fill-white' viewBox="0 0 640 640">
                                        <path d="M73 39.1C63.6 29.7 48.4 29.7 39.1 39.1C29.8 48.5 29.7 63.7 39 73.1L567 601.1C576.4 610.5 591.6 610.5 600.9 601.1C610.2 591.7 610.3 576.5 600.9 567.2L504.5 470.8C507.2 468.4 509.9 466 512.5 463.6C559.3 420.1 590.6 368.2 605.5 332.5C608.8 324.6 608.8 315.8 605.5 307.9C590.6 272.2 559.3 220.2 512.5 176.8C465.4 133.1 400.7 96.2 319.9 96.2C263.1 96.2 214.3 114.4 173.9 140.4L73 39.1zM236.5 202.7C260 185.9 288.9 176 320 176C399.5 176 464 240.5 464 320C464 351.1 454.1 379.9 437.3 403.5L402.6 368.8C415.3 347.4 419.6 321.1 412.7 295.1C399 243.9 346.3 213.5 295.1 227.2C286.5 229.5 278.4 232.9 271.1 237.2L236.4 202.5zM357.3 459.1C345.4 462.3 332.9 464 320 464C240.5 464 176 399.5 176 320C176 307.1 177.7 294.6 180.9 282.7L101.4 203.2C68.8 240 46.4 279 34.5 307.7C31.2 315.6 31.2 324.4 34.5 332.3C49.4 368 80.7 420 127.5 463.4C174.6 507.1 239.3 544 320.1 544C357.4 544 391.3 536.1 421.6 523.4L357.4 459.2z" />
                                    </svg>
                                }
                            </button>
                        </label>

                        {/* Confirm Pasword  */}
                        {login ? '' :
                            <label className="relative block">
                                <span className="absolute -top-3 left-2 text-white text-sm bg-[rgba(0,0,0,0.7)] px-1 rounded-md">
                                    Confirm Password
                                </span>
                                <input
                                    name='confirmPassword'
                                    value={confirmPassword}
                                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                                    type={passwordShow ? "text" : "password"}
                                    className="w-full p-3 text-white border border-white rounded-lg bg-transparent focus:border-blue-300 outline-none pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordShow(!passwordShow)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
                                >
                                    {passwordShow ?
                                        <svg className='h-7 fill-white' viewBox="0 0 640 640">
                                            <path d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320zM320 256C320 291.3 291.3 320 256 320C244.5 320 233.7 317 224.3 311.6C223.3 322.5 224.2 333.7 227.2 344.8C240.9 396 293.6 426.4 344.8 412.7C396 399 426.4 346.3 412.7 295.1C400.5 249.4 357.2 220.3 311.6 224.3C316.9 233.6 320 244.4 320 256z" />
                                        </svg>
                                        :
                                        <svg className='h-7 fill-white' viewBox="0 0 640 640">
                                            <path d="M73 39.1C63.6 29.7 48.4 29.7 39.1 39.1C29.8 48.5 29.7 63.7 39 73.1L567 601.1C576.4 610.5 591.6 610.5 600.9 601.1C610.2 591.7 610.3 576.5 600.9 567.2L504.5 470.8C507.2 468.4 509.9 466 512.5 463.6C559.3 420.1 590.6 368.2 605.5 332.5C608.8 324.6 608.8 315.8 605.5 307.9C590.6 272.2 559.3 220.2 512.5 176.8C465.4 133.1 400.7 96.2 319.9 96.2C263.1 96.2 214.3 114.4 173.9 140.4L73 39.1zM236.5 202.7C260 185.9 288.9 176 320 176C399.5 176 464 240.5 464 320C464 351.1 454.1 379.9 437.3 403.5L402.6 368.8C415.3 347.4 419.6 321.1 412.7 295.1C399 243.9 346.3 213.5 295.1 227.2C286.5 229.5 278.4 232.9 271.1 237.2L236.4 202.5zM357.3 459.1C345.4 462.3 332.9 464 320 464C240.5 464 176 399.5 176 320C176 307.1 177.7 294.6 180.9 282.7L101.4 203.2C68.8 240 46.4 279 34.5 307.7C31.2 315.6 31.2 324.4 34.5 332.3C49.4 368 80.7 420 127.5 463.4C174.6 507.1 239.3 544 320.1 544C357.4 544 391.3 536.1 421.6 523.4L357.4 459.2z" />
                                        </svg>
                                    }
                                </button>
                            </label>
                        }
                    </div>
                    <button
                        type="button"
                        className="flex justify-center items-center w-full text-white cursor-pointer"
                        onClick={googleSignIn}
                    >
                        <svg className="h-7 fill-white" viewBox="0 0 640 640">
                            <path d="M564 325.8C564 467.3 467.1 568 324 568C186.8 568 76 457.2 76 320C76 182.8 186.8 72 324 72C390.8 72 447 96.5 490.3 136.9L422.8 201.8C334.5 116.6 170.3 180.6 170.3 320C170.3 406.5 239.4 476.6 324 476.6C422.2 476.6 459 406.2 464.8 369.7L324 369.7L324 284.4L560.1 284.4C562.4 297.1 564 309.3 564 325.8z" />
                        </svg>
                        <div className="pl-2">
                            <h4 className="text-md">SignUp with Google</h4>
                        </div>
                    </button>

                    {/* Signup link */}
                    <div className="flex justify-center space-x-2 text-white">
                        <h4 className="text-md">{login ? 'New' : 'Old'} to No_doubt?</h4>
                        <button type="button" onClick={() => { setLogin(!login) }} className="text-md text-blue-200 cursor-pointer underline">{login ? 'Sign Up' : 'Login'}</button>
                    </div>

                    {/* Login button */}
                    <div>
                        <button
                            type="submit"
                            className="rounded-full py-3 text-xl bg-[rgba(255,255,255,0.3)] text-white w-full cursor-pointer hover:bg-[rgba(255,255,255,0.4)] transition"
                        >
                            {login ? 'Login' : 'Sign Up'}
                        </button>
                    </div>
                </form>
            </div>
        </DestroyStarsCanvas>
    );
}