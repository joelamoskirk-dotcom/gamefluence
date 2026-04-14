import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import DataInitializer from '@/components/DataInitializer'
import SecurityProvider from '@/components/SecurityProvider'

const inter = Inter({ subsets: ['latin', 'latin-ext', 'vietnamese'] })

export const metadata = {
    title: 'Gamefluence.AI - AI-Powered Gaming Influencer Marketing Platform',
    description: 'Connect gaming studios and brands with top gaming influencers worldwide. AI-powered creator matching, advanced attribution, and performance-based pricing.',
    keywords: 'gaming influencer marketing, AI creator matching, game promotion, influencer platform, gaming marketing, ROI optimization',
    authors: [{ name: 'Gamefluence.AI Team' }],
    creator: 'Gamefluence.AI',
    publisher: 'Gamefluence.AI',
    openGraph: {
        title: 'Gamefluence.AI - AI-Powered Gaming Influencer Marketing',
        description: 'Connect gaming studios and brands with top gaming influencers worldwide using AI-powered matching and optimization',
        url: 'https://gamefluence.ai',
        siteName: 'Gamefluence.AI',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Gamefluence.AI Platform',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Gamefluence.AI - AI-Powered Gaming Influencer Marketing',
        description: 'Connect gaming studios and brands with top gaming influencers worldwide using AI',
        images: ['/twitter-image.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" translate="yes">
            <head>
                {/* CJK + Thai font support for APAC visitors and Google Translate */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Noto+Sans+Thai:wght@400;700&family=Noto+Sans:wght@400;700&display=swap" rel="stylesheet" />
            </head>
            <body className={inter.className} style={{ fontFamily: `${inter.style.fontFamily}, 'Noto Sans', 'Noto Sans JP', 'Noto Sans Thai', sans-serif` }}>
                <nav className="bg-white shadow-sm border-b relative">
                    <div className="container-mobile">
                        <div className="flex justify-between h-14 sm:h-16">
                            <div className="flex items-center space-x-4 sm:space-x-8">
                                <Link href="/">
                                    <h1 className="text-lg sm:text-2xl font-bold gaming-gradient bg-clip-text text-transparent cursor-pointer notranslate">
                                        Gamefluence.AI
                                    </h1>
                                </Link>
                                <div className="hidden md:flex items-center space-x-6">
                                    <Link href="/creators" className="text-gray-600 hover:text-gray-900 text-responsive transition-colors">
                                        Creators
                                    </Link>
                                    <div className="relative group">
                                        <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 text-responsive transition-colors flex items-center gap-1">
                                            Dashboard
                                            <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                                            </svg>
                                        </Link>
                                        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                            <div className="p-2">
                                                <Link href="/campaigns" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                                                    🎯 All Campaigns
                                                </Link>
                                                <Link href="/batch-campaign" className="block px-3 py-2 text-sm text-purple-700 hover:bg-purple-50 rounded-md transition-colors">
                                                    ⚡ Batch Campaign Builder
                                                </Link>
                                                <Link href="/dashboard" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                                                    📊 Campaign Builder
                                                </Link>
                                                <Link href="/dashboard/analytics" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                                                    📈 Advanced Analytics
                                                </Link>
                                                <Link href="/dashboard/market-intelligence" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                                                    🌏 Market Intelligence
                                                </Link>
                                                <Link href="/dashboard/real-time" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                                                    ⚡ Real-Time Dashboard
                                                </Link>
                                                <Link href="/dashboard/ai-insights" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                                                    🤖 AI Insights
                                                </Link>
                                                <Link href="/dashboard/campaign-3" className="block px-3 py-2 text-sm text-purple-700 hover:bg-purple-50 rounded-md transition-colors border-t border-gray-100 mt-1 pt-2">
                                                    🚀 Campaign 3: Massive APAC
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative group">
                                        <Link href="/admin" className="text-gray-600 hover:text-gray-900 text-responsive transition-colors flex items-center gap-1">
                                            Admin
                                            <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                                            </svg>
                                        </Link>
                                        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                            <div className="p-2">
                                                <Link href="/admin" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                                                    🛡️ Admin Dashboard
                                                </Link>
                                                <Link href="/founder" className="block px-3 py-2 text-sm text-red-700 hover:bg-red-50 rounded-md transition-colors border-t border-gray-100 mt-1 pt-2">
                                                    👑 Founder Portal
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <Link href="/news" className="text-gray-600 hover:text-gray-900 text-responsive transition-colors">
                                        News
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 sm:space-x-4">
                                <div className="hidden sm:flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-xs text-gray-500">Live</span>
                                </div>
                                <div className="hidden sm:flex space-x-2">
                                    <Link href="/login">
                                        <button className="btn-primary">Login</button>
                                    </Link>
                                    <Link href="/login">
                                        <button className="btn-secondary">Sign Up</button>
                                    </Link>
                                </div>
                                <div className="sm:hidden">
                                    <Link href="/login">
                                        <button className="btn-primary text-xs px-3 py-2">Login</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Mobile Bottom Navigation */}
                <div className="mobile-nav">
                    <div className="flex justify-around">
                        <Link href="/" className="mobile-nav-item">
                            <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                            </svg>
                            <span>Home</span>
                        </Link>
                        <Link href="/creators" className="mobile-nav-item">
                            <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span>Creators</span>
                        </Link>
                        <Link href="/dashboard" className="mobile-nav-item">
                            <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                            </svg>
                            <span>Dashboard</span>
                        </Link>
                        <Link href="/dashboard/analytics" className="mobile-nav-item">
                            <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                            </svg>
                            <span>Analytics</span>
                        </Link>
                        <Link href="/dashboard/market-intelligence" className="mobile-nav-item">
                            <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd"/>
                            </svg>
                            <span>Markets</span>
                        </Link>
                    </div>
                </div>
                <DataInitializer>
                    <SecurityProvider>
                        {children}
                    </SecurityProvider>
                </DataInitializer>
            </body>
        </html>
    )
}