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
                @keyframes floatSoft {
                    0%, 100% {
                        transform: translate3d(0, 0, 0);
                    }
                    50% {
                        transform: translate3d(0, -12px, 0);
                    }
                }

                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translate3d(-24px, 0, 0);
                    }
                    to {
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }

                @keyframes softGlow {
                    0%, 100% {
                        box-shadow: 0 0 18px rgba(220, 38, 38, 0.25);
                    }
                    50% {
                        box-shadow: 0 0 28px rgba(220, 38, 38, 0.45);
                    }
                }

                .login-float {
                    animation: floatSoft 7s ease-in-out infinite;
                    transform: translate3d(0, 0, 0);
                    backface-visibility: hidden;
                }

                .login-slide-in {
                    animation: slideIn 0.65s ease-out forwards;
                }

                .login-glow {
                    animation: softGlow 3.5s ease-in-out infinite;
                }

                .input-glow:focus {
                    box-shadow: 0 0 16px rgba(220, 38, 38, 0.45);
                }

                body {
                    margin: 0;
                    padding: 0;
                }

                @media (max-width: 768px) {
                    .login-float,
                    .login-glow {
                        animation: none !important;
                    }

                    .mobile-hide-effect {
                        display: none !important;
                    }

                    .mobile-no-blur {
                        -webkit-backdrop-filter: none !important;
                        backdrop-filter: none !important;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .login-float,
                    .login-slide-in,
                    .login-glow {
                        animation: none !important;
                    }
                }
            `}</style>

            <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-red-950 via-red-900 to-black px-4 py-8">
                {/* Background Effects - desktop only */}
                <div className="mobile-hide-effect pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-red-600 opacity-20 blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-red-700 opacity-20 blur-3xl"></div>
                    <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-800 opacity-15 blur-3xl"></div>
                </div>

                {/* Decorative Lines - desktop only */}
                <div className="mobile-hide-effect pointer-events-none absolute inset-0 opacity-10">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"
                            style={{
                                top: `${i * 8}%`,
                                left: 0,
                                right: 0,
                                transform: `rotate(${i * 1.5}deg)`,
                            }}
                        ></div>
                    ))}
                </div>

                {/* Main Container */}
                <div className="relative z-10 my-8 w-full max-w-7xl">
                    <div className="login-glow mobile-no-blur overflow-hidden rounded-3xl border border-red-900/30 bg-black/50 shadow-2xl lg:bg-black/40 lg:backdrop-blur-xl">
                        <div className="grid min-h-[600px] gap-0 lg:grid-cols-2">
                            {/* Left Side - Form */}
                            <div className="login-slide-in flex flex-col justify-center p-6 sm:p-8 lg:p-12">
                                {/* Brand */}
                                <div className="mb-8">
                                    <h1 className="mb-2 bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl lg:text-5xl">
                                        Welcome Back
                                    </h1>

                                    <p className="text-sm text-red-300/70 sm:text-base">
                                        Login khusus admin Fiind Design.
                                    </p>
                                </div>

                                {/* Status Message */}
                                {status && (
                                    <div className="mb-4 rounded-lg border border-green-700/50 bg-green-900/20 p-3 text-sm font-medium text-green-400">
                                        {status}
                                    </div>
                                )}

                                <form onSubmit={submit} className="space-y-6">
                                    {/* Email */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="mb-2 block text-sm font-medium text-red-200 sm:text-base"
                                        >
                                            Email Address
                                        </label>

                                        <div className="relative">
                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                className="input-glow w-full rounded-xl border-2 border-red-800/50 bg-black/50 px-4 py-3 text-red-100 placeholder-red-400/50 transition-all duration-300 focus:border-red-600 focus:outline-none"
                                                placeholder="admin@fiinddesign.com"
                                                autoComplete="username"
                                                autoFocus
                                                onChange={(e) => setData('email', e.target.value)}
                                            />
                                        </div>

                                        {errors.email && (
                                            <p className="mt-2 text-sm text-red-400">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="mb-2 block text-sm font-medium text-red-200 sm:text-base"
                                        >
                                            Password
                                        </label>

                                        <div className="relative">
                                            <input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={data.password}
                                                className="input-glow w-full rounded-xl border-2 border-red-800/50 bg-black/50 px-4 py-3 pr-12 text-red-100 placeholder-red-400/50 transition-all duration-300 focus:border-red-600 focus:outline-none"
                                                placeholder="••••••••"
                                                autoComplete="current-password"
                                                onChange={(e) => setData('password', e.target.value)}
                                            />

                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-red-400 transition-colors hover:text-red-300"
                                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                            >
                                                {showPassword ? (
                                                    <svg
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                        />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>

                                        {errors.password && (
                                            <p className="mt-2 text-sm text-red-400">
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>

                                    {/* Remember & Forgot */}
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <label className="group flex cursor-pointer items-center">
                                            <input
                                                type="checkbox"
                                                name="remember"
                                                checked={data.remember}
                                                onChange={(e) => setData('remember', e.target.checked)}
                                                className="h-4 w-4 rounded border-red-800 bg-black/50 text-red-600 focus:ring-2 focus:ring-red-500"
                                            />

                                            <span className="ml-2 text-sm text-red-300 transition-colors group-hover:text-red-200">
                                                Remember me
                                            </span>
                                        </label>

                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="text-sm text-red-400 transition-colors hover:text-red-300"
                                            >
                                                Forgot password?
                                            </Link>
                                        )}
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-red-700 to-red-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-red-600 hover:to-red-500 hover:shadow-red-900/50 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <span className="relative z-10">
                                            {processing ? 'Signing in...' : 'Sign In'}
                                        </span>

                                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                    </button>
                                </form>
                            </div>

                            {/* Right Side - Character */}
                            <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-gradient-to-br from-red-900/30 to-black/50 p-6 sm:p-8 lg:min-h-full lg:p-12">
                                {/* Decorative circles - desktop/tablet only */}
                                <div className="mobile-hide-effect absolute right-10 top-10 h-24 w-24 rounded-full border-2 border-red-500/30 sm:h-32 sm:w-32"></div>
                                <div className="mobile-hide-effect absolute bottom-10 left-10 h-32 w-32 rounded-full border-2 border-red-600/20 sm:h-40 sm:w-40"></div>

                                {/* Character Image */}
                                <div className="login-float relative z-10 w-full max-w-sm">
                                    <div className="mobile-hide-effect absolute inset-0 rounded-full bg-red-600/20 blur-3xl"></div>

                                    <img
                                        src="/images/Anime-login.jpeg"
                                        alt="Anime Character"
                                        loading="eager"
                                        decoding="async"
                                        className="relative h-auto w-full object-contain drop-shadow-2xl"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />

                                    <div className="hidden rounded-2xl border border-red-800/30 bg-red-950/50 p-8 text-center text-red-300">
                                        <svg
                                            className="mx-auto mb-4 h-24 w-24 opacity-50"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                        <p className="text-sm opacity-70">
                                            Image not found
                                            <br />
                                            Check: public/images/Anime-login.jpeg
                                        </p>
                                    </div>
                                </div>

                                {/* Mini Info */}
                                <div className="absolute bottom-6 right-6 hidden flex-col gap-3 sm:flex">
                                    {['🎮', '📱', '📧'].map((icon, i) => (
                                        <div
                                            key={i}
                                            className="flex h-10 w-10 items-center justify-center rounded-full border border-red-700/50 bg-red-900/30 text-base transition-all hover:scale-110 hover:bg-red-800/50 sm:h-12 sm:w-12 sm:text-xl"
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