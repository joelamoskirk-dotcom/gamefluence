'use client';

import React, { useState } from 'react';
import GamefluenceLogo, { GamefluenceLogoCompact, GamefluenceMarquee } from '@/components/ui/GamefluenceLogo';
import { Palette, Zap, Star, Gamepad2 } from 'lucide-react';

export default function LogoTestPage() {
  const [selectedVariant, setSelectedVariant] = useState('main');
  const [selectedSize, setSelectedSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg');
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [glowIntensity, setGlowIntensity] = useState<'low' | 'medium' | 'high'>('high');

  const variants = [
    { id: 'main', name: 'Main Logo', description: 'Interactive gambling-style lights' },
    { id: 'compact', name: 'Compact Logo', description: 'For navigation and headers' },
    { id: 'marquee', name: 'Casino Marquee', description: 'Full casino experience with border lights' }
  ];

  const sizes = [
    { id: 'sm', name: 'Small', description: '2xl text' },
    { id: 'md', name: 'Medium', description: '4xl text' },
    { id: 'lg', name: 'Large', description: '6xl text' },
    { id: 'xl', name: 'Extra Large', description: '8xl text' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-yellow-400" />
            <h1 className="text-3xl font-bold text-white">Gamefluence Logo Test</h1>
          </div>
          <p className="mt-2 text-gray-300">
            Interactive gambling-style logo with casino lights and animations
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Logo Variant Selection */}
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Logo Variants
              </h3>
              
              <div className="space-y-3">
                {variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant.id)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      selectedVariant === variant.id
                        ? 'bg-yellow-400/20 border-2 border-yellow-400 text-yellow-400'
                        : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="font-medium">{variant.name}</div>
                    <div className="text-sm opacity-75">{variant.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            {selectedVariant === 'main' && (
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-400" />
                  Size Options
                </h3>
                
                <div className="grid grid-cols-2 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id as any)}
                      className={`p-2 rounded text-sm transition-all ${
                        selectedSize === size.id
                          ? 'bg-blue-400/20 border border-blue-400 text-blue-400'
                          : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="font-medium">{size.name}</div>
                      <div className="text-xs opacity-75">{size.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Animation Controls */}
            {selectedVariant === 'main' && (
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-pink-400" />
                  Animation Settings
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Animation</span>
                    <button
                      onClick={() => setAnimationEnabled(!animationEnabled)}
                      className={`px-3 py-1 rounded text-sm transition-all ${
                        animationEnabled
                          ? 'bg-green-400/20 text-green-400 border border-green-400'
                          : 'bg-red-400/20 text-red-400 border border-red-400'
                      }`}
                    >
                      {animationEnabled ? 'ON' : 'OFF'}
                    </button>
                  </div>
                  
                  <div>
                    <span className="text-gray-300 block mb-2">Glow Intensity</span>
                    <div className="grid grid-cols-3 gap-1">
                      {(['low', 'medium', 'high'] as const).map((intensity) => (
                        <button
                          key={intensity}
                          onClick={() => setGlowIntensity(intensity)}
                          className={`p-2 rounded text-xs capitalize transition-all ${
                            glowIntensity === intensity
                              ? 'bg-purple-400/20 text-purple-400 border border-purple-400'
                              : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          {intensity}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-gradient-to-r from-yellow-400/10 to-orange-400/10 backdrop-blur-sm rounded-lg p-6 border border-yellow-400/20">
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">
                🎰 How to Use
              </h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Click the main logo to trigger light sequence</li>
                <li>• Each letter lights up in gambling casino style</li>
                <li>• Adjust size and glow intensity</li>
                <li>• Try different variants for different use cases</li>
                <li>• Perfect for gaming platform branding</li>
              </ul>
            </div>
          </div>

          {/* Logo Display */}
          <div className="lg:col-span-3">
            <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-white/10 min-h-[600px] flex items-center justify-center">
              <div className="text-center">
                {selectedVariant === 'main' && (
                  <GamefluenceLogo
                    size={selectedSize}
                    animated={animationEnabled}
                    glowIntensity={glowIntensity}
                    className="mb-8"
                  />
                )}
                
                {selectedVariant === 'compact' && (
                  <div className="space-y-8">
                    <GamefluenceLogoCompact className="justify-center" />
                    <div className="text-gray-400 text-sm">
                      Perfect for navigation bars and headers
                    </div>
                  </div>
                )}
                
                {selectedVariant === 'marquee' && (
                  <div className="space-y-8">
                    <GamefluenceMarquee />
                    <div className="text-gray-400 text-sm max-w-md mx-auto">
                      Full casino experience with rotating border lights and scrolling text
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Usage Examples */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dark Background Example */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <h4 className="text-white font-semibold mb-4">On Dark Background</h4>
                <div className="flex justify-center">
                  <GamefluenceLogoCompact />
                </div>
              </div>

              {/* Light Background Example */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="text-gray-900 font-semibold mb-4">On Light Background</h4>
                <div className="flex justify-center">
                  <GamefluenceLogoCompact />
                </div>
              </div>

              {/* Navigation Example */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6">
                <h4 className="text-white font-semibold mb-4">In Navigation</h4>
                <div className="flex items-center justify-between">
                  <GamefluenceLogoCompact />
                  <div className="flex space-x-4 text-white text-sm">
                    <span>Dashboard</span>
                    <span>Campaigns</span>
                    <span>Creators</span>
                  </div>
                </div>
              </div>

              {/* Hero Section Example */}
              <div className="bg-gradient-to-br from-gaming via-purple-600 to-accent rounded-lg p-6">
                <h4 className="text-white font-semibold mb-4">Hero Section</h4>
                <div className="text-center">
                  <GamefluenceLogo size="md" animated={true} glowIntensity="high" />
                </div>
              </div>
            </div>

            {/* Color Palette Reference */}
            <div className="mt-8 bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h4 className="text-white font-semibold mb-4">Site Color Palette</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-lg mx-auto mb-2 shadow-lg"></div>
                  <div className="text-xs text-gray-300">Primary</div>
                  <div className="text-xs text-gray-500">#3b82f6</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary rounded-lg mx-auto mb-2 shadow-lg"></div>
                  <div className="text-xs text-gray-300">Secondary</div>
                  <div className="text-xs text-gray-500">#8b5cf6</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-lg mx-auto mb-2 shadow-lg"></div>
                  <div className="text-xs text-gray-300">Accent</div>
                  <div className="text-xs text-gray-500">#ec4899</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gaming rounded-lg mx-auto mb-2 shadow-lg"></div>
                  <div className="text-xs text-gray-300">Gaming</div>
                  <div className="text-xs text-gray-500">#6d28d9</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-400 rounded-lg mx-auto mb-2 shadow-lg"></div>
                  <div className="text-xs text-gray-300">Casino Gold</div>
                  <div className="text-xs text-gray-500">#fbbf24</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}