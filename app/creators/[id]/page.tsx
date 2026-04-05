import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Instagram, Twitch, Youtube, Twitter } from 'lucide-react';

// Generate static params for static export
export function generateStaticParams() {
  return [
    { id: 'alex-gamemaster' },
    { id: 'sarah-plays' },
    { id: 'gaming-with-mike' }
  ];
}

// This would normally come from a database
const getCreatorData = (id: string) => {
  const creators = {
    'alex-gamemaster': {
      name: 'Alex GameMaster',
      avatar: '👨‍💻',
      followers: 125000,
      engagement: 8.5,
      bio: 'Professional gamer and content creator specializing in FPS and battle royale games. Known for high-energy streams and competitive gameplay.',
    },
    'sarah-plays': {
      name: 'Sarah Plays',
      avatar: '👩‍🎮',
      followers: 250000,
      engagement: 7.2,
      bio: 'Family-friendly gaming content creator focusing on adventure and simulation games. Building positive gaming communities.',
    },
    'gaming-with-mike': {
      name: 'Gaming With Mike',
      avatar: '🎮',
      followers: 180000,
      engagement: 9.1,
      bio: 'Competitive esports player and coach. Specializes in MOBA games and strategic gameplay analysis.',
    },
  };

  const creator = creators[id as keyof typeof creators] || creators['alex-gamemaster'];
  
  return {
    id,
    ...creator,
    platforms: {
      twitch: id,
      youtube: id,
      instagram: id,
      twitter: id,
    },
    recentGames: ['Apex Legends', 'Call of Duty: Warzone', 'Valorant'],
    rate: 200, // Base rate for 5k+ followers
    audienceDemo: {
      age: '18-34 (75%)',
      gender: 'Male (65%), Female (35%)',
      interests: ['FPS Games', 'Esports', 'PC Gaming', 'Game Development'],
    },
    pastCampaigns: [
      {
        game: 'Battle Royale Masters',
        studio: 'Epic Games',
        views: 450000,
        engagement: 9.2,
      },
      {
        game: 'Tactical Ops',
        studio: 'Riot Games',
        views: 380000,
        engagement: 8.7,
      },
    ],
  };
};

export default function CreatorProfile({ params }: { params: { id: string } }) {
  const creator = getCreatorData(params.id);
  const platformFee = creator.rate * 0.2;
  const managementFee = 200;
  const totalRate = creator.rate + platformFee + managementFee;

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/creators" className="flex items-center text-primary mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Creators
      </Link>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Creator Profile Card */}
        <div className="card md:col-span-1">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center text-4xl border-4 border-primary mb-4">
              {creator.avatar}
            </div>
            <h1 className="text-2xl font-bold">{creator.name}</h1>
            <p className="text-gray-600">{creator.followers.toLocaleString()} Followers</p>
          </div>

          <div className="flex justify-center space-x-4 mb-6">
            <a href={`https://twitch.tv/${creator.platforms.twitch}`} target="_blank" rel="noopener noreferrer" className="text-[#9146FF] hover:opacity-80">
              <Twitch />
            </a>
            <a href={`https://youtube.com/${creator.platforms.youtube}`} target="_blank" rel="noopener noreferrer" className="text-[#FF0000] hover:opacity-80">
              <Youtube />
            </a>
            <a href={`https://instagram.com/${creator.platforms.instagram}`} target="_blank" rel="noopener noreferrer" className="text-[#E1306C] hover:opacity-80">
              <Instagram />
            </a>
            <a href={`https://twitter.com/${creator.platforms.twitter}`} target="_blank" rel="noopener noreferrer" className="text-[#1DA1F2] hover:opacity-80">
              <Twitter />
            </a>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Recent Games</h3>
            <div className="flex flex-wrap gap-2">
              {creator.recentGames.map((game) => (
                <span key={game} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {game}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Creator Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">About</h2>
            <p>{creator.bio}</p>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold mb-4">Audience Demographics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Age</h3>
                <p>{creator.audienceDemo.age}</p>
              </div>
              <div>
                <h3 className="font-semibold">Gender</h3>
                <p>{creator.audienceDemo.gender}</p>
              </div>
              <div className="col-span-2">
                <h3 className="font-semibold">Interests</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {creator.audienceDemo.interests.map((interest) => (
                    <span key={interest} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold mb-4">Past Campaigns</h2>
            <div className="space-y-4">
              {creator.pastCampaigns.map((campaign) => (
                <div key={campaign.game} className="border-b pb-4 last:border-0 last:pb-0">
                  <h3 className="font-semibold">{campaign.game}</h3>
                  <p className="text-gray-600">{campaign.studio}</p>
                  <div className="flex justify-between mt-2">
                    <span>{campaign.views.toLocaleString()} Views</span>
                    <span>{campaign.engagement}% Engagement</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card bg-primary/5 border-primary/20">
            <h2 className="text-xl font-bold mb-4">Campaign Rate</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Base Rate (5k+ followers)</span>
                <span>${creator.rate}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee (20%)</span>
                <span>${platformFee}</span>
              </div>
              <div className="flex justify-between">
                <span>Campaign Management Fee</span>
                <span>${managementFee}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>${totalRate}</span>
              </div>
            </div>
            <div className="mt-6">
              <Button className="w-full">Add to Campaign</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}