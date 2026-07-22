import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import DataInitializer from '@/components/DataInitializer'
import SecurityProvider from '@/components/SecurityProvider'
import MobileMenu from '@/components/ui/MobileMenu'
import Footer from '@/components/ui/Footer'
import { SpotlightTourProvider } from '@/components/ui/SpotlightTour'

const inter = Inter({ subsets: ['latin', 'latin-ext', 'vietnamese'] })

export const metadata = {
    metadataBase: new URL('https://gamefluence.com.au'),
    title: 'Gamefluence - Gaming Creator Marketing Platform',
    description: 'Connect APAC agencies and brands with gaming content creators for authentic audience engagement. Creator matching, attribution, and performance-based pricing.',
    keywords: 'gaming influencer marketing, creator matching, game promotion, influencer platform, gaming marketing, APAC',
    authors: [{ name: 'Gamefluence' }],
    creator: 'Gamefluence',
    publisher: 'Gamefluence',
    openGraph: {
        title: 'Gamefluence - Gaming Creator Marketing Platform',
        description: 'Connect APAC agencies and brands with gaming content creators for authentic audience engagement',
        url: 'https://gamefluence.com.au',
        siteName: 'Gamefluence',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Gamefluence Platform',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Gamefluence - Gaming Creator Marketing Platform',
        description: 'Connect APAC agencies and brands with gaming content creators for authentic audience engagement',
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
                {/* CJK + Thai font support loaded via globals.css @import to avoid no-page-custom-font warning */}
            </head>
            <body className={inter.className} style={{ fontFamily: `${inter.style.fontFamily}, 'Noto Sans', 'Noto Sans JP', 'Noto Sans Thai', sans-serif` }}>
                <nav className="bg-white shadow-sm border-b relative">
                    <div className="container-mobile">
                        <div className="flex justify-between h-14 sm:h-16">
                            <div className="flex items-center space-x-4 sm:space-x-8">
                                <Link href="/">
                                    <h1 className="text-lg sm:text-2xl font-bold gaming-gradient bg-clip-text text-transparent cursor-pointer notranslate">
                                        Gamefluence
                                    </h1>
                                </Link>
                                <div className="hidden md:flex items-center space-x-6">
                                    <Link href="/creators" className="text-gray-600 hover:text-gray-900 text-responsive transition-colors">
                                        How It Works
                                    </Link>
                                    <Link href="/get-started" className="text-gray-600 hover:text-gray-900 text-responsive transition-colors">
                                        For Brands
                                    </Link>
                                    <Link href="/about" className="text-gray-600 hover:text-gray-900 text-responsive transition-colors">
                                        About
                                    </Link>
                                    <Link href="/news" className="text-gray-600 hover:text-gray-900 text-responsive transition-colors">
                                        News
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 sm:space-x-4">
                                <div className="hidden sm:flex space-x-2">
                                    <Link href="/get-started">
                                        <button className="btn-primary">Get Started</button>
                                    </Link>
                                    <Link href="/creator-signup">
                                        <button className="btn-secondary">Join as Creator</button>
                                    </Link>
                                    <Link href="/founder">
                                        <button className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2 transition-colors">Login</button>
                                    </Link>
                                </div>
                                <div className="sm:hidden">
                                    <MobileMenu />
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
                            <span>How It Works</span>
                        </Link>
                        <Link href="/dashboard" className="mobile-nav-item">
                            <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                            </svg>
                            <span>Results</span>
                        </Link>
                        <Link href="/dashboard/analytics" className="mobile-nav-item">
                            <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                            </svg>
                            <span>Insights</span>
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
                        <SpotlightTourProvider>
                            {children}
                        </SpotlightTourProvider>
                    </SecurityProvider>
                </DataInitializer>
                <Footer />
            </body>
        </html>
    )
}