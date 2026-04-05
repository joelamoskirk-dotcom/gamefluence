import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Generate static params for static export
export function generateStaticParams() {
  return [
    { id: '1' }
  ];
}

// This would normally come from a database or CMS
const getBlogPost = (id: string) => {
  const posts = {
    '1': {
      id: 1,
      title: 'Welcome to Gamefluence: Revolutionizing Gaming Influencer Marketing',
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
        
        <p><strong>Welcome to the future of gaming influencer marketing. Welcome to Gamefluence.</strong></p>
      `,
      author: 'Gamefluence Team',
      date: '2024-07-22',
      category: 'Company News',
      readTime: '5 min read'
    }
  };
  
  return posts[id as keyof typeof posts] || null;
};

export default function BlogPost({ params }: { params: { id: string } }) {
  const post = getBlogPost(params.id);
  
  if (!post) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/news">
            <Button>← Back to News</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/news" className="flex items-center text-primary mb-8 hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to News
        </Link>

        <article className="card">
          <div className="mb-6">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="bg-gaming text-white px-3 py-1 rounded-full font-semibold">
                {post.category}
              </span>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.author}
              </div>
              <span>{post.readTime}</span>
            </div>
            
            <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
            
            <div className="flex items-center justify-between border-b pb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gaming/10 flex items-center justify-center">
                  <span className="text-gaming font-bold">G</span>
                </div>
                <div>
                  <div className="font-semibold">{post.author}</div>
                  <div className="text-sm text-gray-500">Published on {new Date(post.date).toLocaleDateString()}</div>
                </div>
              </div>
              
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              lineHeight: '1.7',
            }}
          />
          
          <div className="mt-12 pt-8 border-t">
            <div className="bg-gradient-to-r from-gaming/10 to-accent/10 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-4">
                Join thousands of gaming brands and creators on Gamefluence
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/login">
                  <Button>Sign Up as Brand</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline">Join as Creator</Button>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}