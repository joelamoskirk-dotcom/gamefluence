import React from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Welcome to Gamefluence: Revolutionizing Gaming Influencer Marketing',
    excerpt: 'Our vision and mission to become the go-to platform for gaming brands and influencers worldwide.',
    content: `
      <p>Welcome to Gamefluence, the future of gaming influencer marketing! We're thrilled to introduce you to a platform that's set to transform how gaming studios, brands, and content creators connect and collaborate.</p>
      
      <h3>Our Vision</h3>
      <p>At Gamefluence, we envision a world where every gaming brand can seamlessly connect with the perfect influencers to amplify their reach and impact. We believe that authentic partnerships between brands and creators drive the most meaningful engagement and results.</p>
      
      <h3>Our Mission</h3>
      <p>Our mission is simple yet ambitious: to become the definitive choice for brands when it comes to gaming influencer marketing. We're building more than just a platform – we're creating an ecosystem that empowers both brands and creators to achieve their goals through strategic partnerships.</p>
      
      <h3>Why Gaming Needs Gamefluence</h3>
      <p>The gaming industry is unique. It's passionate, diverse, and constantly evolving. Traditional influencer marketing platforms often fall short when it comes to understanding the nuances of gaming culture, audience behavior, and content creation in this space.</p>
      
      <p>That's where Gamefluence comes in. We've built our platform specifically for the gaming industry, with features like:</p>
      <ul>
        <li><strong>UPLVLD Brand Safety Technology:</strong> Our AI-powered system ensures creators maintain the highest standards of brand safety</li>
        <li><strong>Relevance-Based Matching:</strong> Our algorithm matches brands with creators based on audience alignment, content style, and campaign objectives</li>
        <li><strong>Transparent Pricing:</strong> Clear, fair pricing with no hidden fees – just a simple structure that works for everyone</li>
        <li><strong>Real-Time Analytics:</strong> Comprehensive tracking and measurement tools to optimize campaign performance</li>
      </ul>
      
      <h3>Winning Over the Games Industry</h3>
      <p>We're not just another marketing platform – we're gaming natives who understand the industry from the inside out. Our team consists of gamers, streamers, marketers, and technologists who live and breathe gaming culture.</p>
      
      <p>We're committed to:</p>
      <ul>
        <li>Supporting creators with fair compensation and growth opportunities</li>
        <li>Helping brands achieve authentic engagement with gaming audiences</li>
        <li>Building tools that make campaign management effortless and effective</li>
        <li>Fostering a community where creativity and commerce thrive together</li>
      </ul>
      
      <h3>The Future is Bright</h3>
      <p>This is just the beginning. We have exciting features in development, including advanced analytics integrations, automated workflow capabilities, and enhanced creator discovery tools. Our roadmap is driven by feedback from our community of brands and creators.</p>
      
      <p>Whether you're a gaming studio looking to launch your next big title, a brand wanting to connect with gaming audiences, or a content creator ready to monetize your passion – Gamefluence is here to help you succeed.</p>
      
      <p>Welcome to the future of gaming influencer marketing. Welcome to Gamefluence.</p>
    `,
    author: 'Gamefluence Team',
    date: '2024-07-22',
    category: 'Company News',
    featured: true
  },
  {
    id: 2,
    title: 'The State of Gaming Influencer Marketing in 2024',
    excerpt: 'Key trends and insights shaping the gaming influencer landscape this year.',
    content: 'Coming soon...',
    author: 'Marketing Team',
    date: '2024-07-20',
    category: 'Industry Insights',
    featured: false
  },
  {
    id: 3,
    title: 'Best Practices for Gaming Brand Campaigns',
    excerpt: 'Essential tips for creating successful influencer campaigns in the gaming space.',
    content: 'Coming soon...',
    author: 'Strategy Team',
    date: '2024-07-18',
    category: 'Best Practices',
    featured: false
  }
];

export default function NewsPage() {
  const featuredPost = blogPosts.find(post => post.featured);
  const otherPosts = blogPosts.filter(post => !post.featured);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Gamefluence News & Insights</h1>
          <p className="text-xl text-gray-600">
            Stay updated with the latest in gaming influencer marketing
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="card mb-12 bg-gradient-to-r from-gaming/5 to-accent/5 border-l-4 border-l-gaming">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-gaming text-white px-3 py-1 rounded-full text-sm font-semibold">
                Featured
              </span>
              <span className="text-sm text-gray-500">{featuredPost.category}</span>
            </div>
            
            <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
            <p className="text-lg text-gray-700 mb-6">{featuredPost.excerpt}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {featuredPost.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(featuredPost.date).toLocaleDateString()}
                </div>
              </div>
              
              <Link href={`/news/${featuredPost.id}`}>
                <button className="flex items-center gap-2 text-gaming hover:text-gaming/80 font-semibold">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Other Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherPosts.map(post => (
            <div key={post.id} className="card">
              <div className="mb-3">
                <span className="text-sm text-gray-500">{post.category}</span>
              </div>
              
              <h3 className="text-xl font-bold mb-3">{post.title}</h3>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </div>
                
                <Link href={`/news/${post.id}`}>
                  <button className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="card mt-12 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Stay in the Loop</h3>
            <p className="text-gray-600 mb-6">
              Get the latest insights, tips, and updates delivered to your inbox
            </p>
            
            <div className="flex max-w-md mx-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border rounded-lg"
              />
              <button className="btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}