import './globals.css'
import Link from 'next/link'
import DataInitializer from '@/components/DataInitializer'
import SecurityProvider from '@/components/SecurityProvider'
import MobileMenu from '@/components/ui/MobileMenu'
import Footer from '@/components/ui/Footer'
import { SpotlightTourProvider } from '@/components/ui/SpotlightTour'
import Logo from '@/components/brand/Logo'
import { Button } from '@/components/ui/Button'

export const metadata = {
    metadataBase: new URL('https://gamefluence.com.au'),
    title: 'Gamefluence — Gaming Creator Marketing Platform',
    description: 'Connect APAC agencies and brands with gaming content creators for authentic audience engagement. Creator matching, attribution, and performance-based pricing.',
    keywords: 'gaming influencer marketing, creator matching, game promotion, influencer platform, gaming marketing, APAC',
    authors: [{ name: 'Gamefluence' }],
    creator: 'Gamefluence',
    publisher: 'Gamefluence',
    openGraph: {
        title: 'Gamefluence — Gaming Creator Marketing Platform',
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
        title: 'Gamefluence — Gaming Creator Marketing Platform',
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
            <head />
            <body className="font-sans text-t-mid bg-ink-900 antialiased overflow-x-hidden">
                {/* Marketing Navigation — unauthenticated */}
                <nav className="bg-ink-900 border-b border-line relative z-30">
                    <div className="container-mobile">
                        <div className="flex justify-between h-14 sm:h-16">
                            <div className="flex items-center space-x-4 sm:space-x-8">
                                <Link href="/" aria-label="Gamefluence home">
                                    <Logo markSize={32} interactive={false} autoDemo={false} />
                                </Link>
                                <div className="hidden md:flex items-center space-x-6">
                                    <Link href="/#services" className="text-t-lo hover:text-t-hi text-sm transition-colors duration-micro ease-brand">
                                        Services
                                    </Link>
                                    <Link href="/about" className="text-t-lo hover:text-t-hi text-sm transition-colors duration-micro ease-brand">
                                        About
                                    </Link>
                                    <Link href="/news" className="text-t-lo hover:text-t-hi text-sm transition-colors duration-micro ease-brand">
                                        News
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 sm:space-x-3">
                                <div className="hidden sm:flex items-center space-x-3">
                                    <Link href="/get-started">
                                        <Button variant="primary" size="sm">Get Your Campaign Plan</Button>
                                    </Link>
                                    <Link href="/login" className="text-sm text-t-lo hover:text-t-hi px-3 py-2 transition-colors duration-micro ease-brand min-h-[44px] flex items-center">
                                        Login
                                    </Link>
                                </div>
                                <MobileMenu />
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Mobile Bottom Navigation */}
                <div className="mobile-nav">
                    <div className="flex justify-around">
                        <Link href="/" className="mobile-nav-item">
                            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                            </svg>
                            <span>Home</span>
                        </Link>
                        <a href="/#services" className="mobile-nav-item">
                            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                            </svg>
                            <span>Services</span>
                        </a>
                        <Link href="/about" className="mobile-nav-item">
                            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span>About</span>
                        </Link>
                        <Link href="/get-started" className="mobile-nav-item text-label">
                            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                            </svg>
                            <span>Get a Plan</span>
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
