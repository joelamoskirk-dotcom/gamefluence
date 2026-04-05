import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Twitch, Youtube, Instagram } from 'lucide-react';

// This would normally come from a database
const creators = [
  {
    id: 'alex-gamemaster',
    name: 'Alex GameMaster',
    avatar: '👨‍💻',
    followers: 125000,
    platforms: ['twitch', 'youtube', 'instagram'],
    topGames: ['Apex Legends', 'Call of Duty'],
    rate: 200,
  },
  {
    id: 'sarah-plays',
    name: 'Sarah Plays',
    avatar: '👩‍🎮',
    followers: 250000,
    platforms: ['youtube', 'instagram'],
    topGames: ['Minecraft', 'Fortnite'],
    rate: 200,
  },
  {
    id: 'gaming-with-mike',
    name: 'Gaming With Mike',
    avatar: '🎮',
    followers: 180000,
    platforms: ['twitch', 'youtube'],
    topGames: ['League of Legends', 'Valorant'],
    rate: 200,
  },
  {
    id: 'jessica-gamer',
    name: 'Jessica Gamer',
    avatar: '🕹️',
    followers: 320000,
    platforms: ['youtube', 'instagram', 'twitch'],
    topGames: ['Among Us', 'Fall Guys'],
    rate: 200,
  },
  {
    id: 'pro-gamer-dave',
    name: 'Pro Gamer Dave',
    avatar: '🏆',
    followers: 420000,
    platforms: ['twitch', 'youtube'],
    topGames: ['Counter-Strike', 'Dota 2'],
    rate: 200,
  },
  {
    id: 'gaming-guru',
    name: 'Gaming Guru',
    avatar: '🎯',
    followers: 510000,
    platforms: ['youtube', 'instagram'],
    topGames: ['Overwatch', 'Rainbow Six Siege'],
    rate: 200,
  },
];

export default function CreatorsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gaming Creators</h1>
        <div className="flex gap-2">
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Sort</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creators.map((creator) => (
          <Link href={`/creators/${creator.id}`} key={creator.id}>
            <div className="card hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl border-2 border-primary">
                  {creator.avatar}
                </div>
                <div>
                  <h2 className="font-bold text-lg">{creator.name}</h2>
                  <p className="text-gray-600">{creator.followers.toLocaleString()} Followers</p>
                </div>
              </div>
              
              <div className="flex gap-2 mb-4">
                {creator.platforms.includes('twitch') && (
                  <span className="text-[#9146FF]"><Twitch size={18} /></span>
                )}
                {creator.platforms.includes('youtube') && (
                  <span className="text-[#FF0000]"><Youtube size={18} /></span>
                )}
                {creator.platforms.includes('instagram') && (
                  <span className="text-[#E1306C]"><Instagram size={18} /></span>
                )}
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm text-gray-600 mb-1">Top Games</h3>
                <div className="flex flex-wrap gap-1">
                  {creator.topGames.map((game) => (
                    <span key={game} className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                      {game}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-3 border-t">
                <span className="font-semibold">${creator.rate} base rate</span>
                <Button variant="outline" size="sm">View Profile</Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}