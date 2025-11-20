import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }

                @keyframes pulse {
                    0%, 100% { opacity: 0.6; }
                    50% { opacity: 1; }
                }

                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes glow {
                    0%, 100% {
                        box-shadow: 0 0 20px rgba(220, 38, 38, 0.5),
                                    0 0 40px rgba(220, 38, 38, 0.3),
                                    inset 0 0 20px rgba(220, 38, 38, 0.1);
                    }
                    50% {
                        box-shadow: 0 0 30px rgba(220, 38, 38, 0.8),
                                    0 0 60px rgba(220, 38, 38, 0.5),
                                    inset 0 0 30px rgba(220, 38, 38, 0.2);
                    }
                }

                @keyframes shimmer {
                    0% { background-position: -1000px 0; }
                    100% { background-position: 1000px 0; }
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .animate-pulse-slow {
                    animation: pulse 3s ease-in-out infinite;
                }

                .animate-slide-in {
                    animation: slideIn 0.8s ease-out forwards;
                }

                .animate-glow {
                    animation: glow 2s ease-in-out infinite;
                }

                .input-glow:focus {
                    box-shadow: 0 0 20px rgba(220, 38, 38, 0.6),
                                0 0 40px rgba(220, 38, 38, 0.3);
                }

                .shimmer {
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.1),
                        transparent
                    );
                    background-size: 1000px 100%;
                    animation: shimmer 3s infinite;
                }

                body {
                    margin: 0;
                    padding: 0;
                }
            `}</style>

            <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-red-950 via-red-900 to-black">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
                    <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-red-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
                </div>

                {/* Decorative Lines */}
                <div className="absolute inset-0 opacity-10">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"
                            style={{
                                top: `${i * 5}%`,
                                left: 0,
                                right: 0,
                                transform: `rotate(${i * 2}deg)`,
                                animation: `pulse ${3 + i * 0.2}s ease-in-out infinite`
                            }}
                        ></div>
                    ))}
                </div>

                {/* Main Container */}
                <div className="relative z-10 w-full max-w-7xl mx-4 lg:mx-8 my-8">
                    <div className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-red-900/30 animate-glow">
                        <div className="grid lg:grid-cols-2 gap-0 min-h-[600px]">
                            {/* Left Side - Form */}
                            <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center animate-slide-in">
                                {/* Logo/Brand */}
                                <div className="mb-8">
                                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300 mb-2">
                                        Welcome Back
                                    </h1>
                                    <p className="text-red-300/70 text-sm sm:text-base">
                                        Don't have an account? <Link href={route('register')} className="text-red-400 hover:text-red-300 underline transition-colors">Sign up</Link>
                                    </p>
                                </div>

                                {/* Status Message */}
                                {status && (
                                    <div className="mb-4 text-sm font-medium text-green-400 bg-green-900/20 border border-green-700/50 rounded-lg p-3">
                                        {status}
                                    </div>
                                )}

                                <form onSubmit={submit} className="space-y-6">
                                    {/* Email Input */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="text-red-200 mb-2 block font-medium text-sm sm:text-base"
                                        >
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                className="w-full px-4 py-3 bg-black/50 border-2 border-red-800/50 rounded-xl text-red-100 placeholder-red-400/50 focus:outline-none focus:border-red-600 input-glow transition-all duration-300"
                                                placeholder="example@email.com"
                                                autoComplete="username"
                                                onChange={(e) => setData('email', e.target.value)}
                                            />
                                            <div className="absolute inset-0 shimmer rounded-xl pointer-events-none"></div>
                                        </div>
                                        {errors.email && (
                                            <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                                        )}
                                    </div>

                                    {/* Password Input */}
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="text-red-200 mb-2 block font-medium text-sm sm:text-base"
                                        >
                                            Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={data.password}
                                                className="w-full px-4 py-3 pr-12 bg-black/50 border-2 border-red-800/50 rounded-xl text-red-100 placeholder-red-400/50 focus:outline-none focus:border-red-600 input-glow transition-all duration-300"
                                                placeholder="••••••••"
                                                autoComplete="current-password"
                                                onChange={(e) => setData('password', e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 hover:text-red-300 transition-colors z-10"
                                            >
                                                {showPassword ? (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                )}
                                            </button>
                                            <div className="absolute inset-0 shimmer rounded-xl pointer-events-none"></div>
                                        </div>
                                        {errors.password && (
                                            <p className="mt-2 text-sm text-red-400">{errors.password}</p>
                                        )}
                                    </div>

                                    {/* Remember & Forgot */}
                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                        <label className="flex items-center cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                name="remember"
                                                checked={data.remember}
                                                onChange={(e) => setData('remember', e.target.checked)}
                                                className="w-4 h-4 text-red-600 bg-black/50 border-red-800 rounded focus:ring-red-500 focus:ring-2"
                                            />
                                            <span className="ml-2 text-sm text-red-300 group-hover:text-red-200 transition-colors">
                                                Remember me
                                            </span>
                                        </label>

                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="text-sm text-red-400 hover:text-red-300 transition-colors"
                                            >
                                                Forgot password?
                                            </Link>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full py-3 px-6 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-red-900/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                                    >
                                        <span className="relative z-10">
                                            {processing ? 'Signing in...' : 'Sign In'}
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </button>
                                </form>
                            </div>

                            {/* Right Side - Anime Character */}
                            <div className="relative bg-gradient-to-br from-red-900/30 to-black/50 p-6 sm:p-8 lg:p-12 flex items-center justify-center overflow-hidden min-h-[400px] lg:min-h-full">
                                {/* Decorative circles */}
                                <div className="absolute top-10 right-10 w-24 sm:w-32 h-24 sm:h-32 border-2 border-red-500/30 rounded-full animate-pulse-slow"></div>
                                <div className="absolute bottom-10 left-10 w-32 sm:w-40 h-32 sm:h-40 border-2 border-red-600/20 rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>

                                {/* Character Image */}
                                <div className="relative z-10 animate-float w-full max-w-sm">
                                    <div className="absolute inset-0 bg-red-600/20 blur-3xl rounded-full"></div>
                                    <img
                                        src="/images/anime-login.png"
                                        alt="Anime Character"
                                        className="relative w-full h-auto object-contain drop-shadow-2xl"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            const placeholder = document.createElement('div');
                                            placeholder.className = 'relative bg-red-950/50 rounded-2xl p-8 backdrop-blur-sm border border-red-800/30 flex items-center justify-center aspect-square';
                                            placeholder.innerHTML = `
                                                <div class="text-center text-red-300">
                                                    <svg class="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    <p class="text-sm opacity-70">Image not found<br/>Check: public/images/anime-login.png</p>
                                                </div>
                                            `;
                                            e.target.parentElement.appendChild(placeholder);
                                        }}
                                    />
                                </div>

                                {/* Social Links */}
                                <div className="absolute bottom-6 right-6 flex flex-col gap-3">
                                    {['🎮', '📱', '📧'].map((icon, i) => (
                                        <div
                                            key={i}
                                            className="w-10 h-10 sm:w-12 sm:h-12 bg-red-900/30 backdrop-blur-sm border border-red-700/50 rounded-full flex items-center justify-center text-base sm:text-xl hover:bg-red-800/50 transition-all cursor-pointer hover:scale-110"
                                            style={{animationDelay: `${i * 0.2}s`}}
                                        >
                                            {icon}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
