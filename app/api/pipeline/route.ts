import { NextRequest, NextResponse } from 'next/server';
import { filterPipeline, getPipelineStats, getOutreachTemplate, PIPELINE_DATA } from '@/lib/creator-pipeline';
import type { Market, Platform, PipelineStatus } from '@/lib/creator-pipeline';

// GET — fetch pipeline with filters
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const filters = {
    market: searchParams.get('market') as Market | undefined,
    platform: searchParams.get('platform') as Platform | undefined,
    status: searchParams.get('status') as PipelineStatus | undefined,
    minFollowers: searchParams.get('minFollowers') ? parseInt(searchParams.get('minFollowers')!) : undefined,
    maxFollowers: searchParams.get('maxFollowers') ? parseInt(searchParams.get('maxFollowers')!) : undefined,
    minScore: searchParams.get('minScore') ? parseInt(searchParams.get('minScore')!) : undefined,
    search: searchParams.get('search') || undefined,
  };

  // Clean undefined values
  Object.keys(filters).forEach(key => {
    if (filters[key as keyof typeof filters] === undefined) {
      delete filters[key as keyof typeof filters];
    }
  });

  const creators = filterPipeline(filters);
  const stats = getPipelineStats();

  return NextResponse.json({
    creators,
    stats,
    total: creators.length,
    pipelineTotal: PIPELINE_DATA.length,
  });
}

// POST — generate outreach email for selected creators
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { creatorIds, action } = body;

    if (action === 'generate-outreach') {
      const selectedCreators = PIPELINE_DATA.filter(c => creatorIds.includes(c.id));
      const outreachEmails = selectedCreators.map(creator => ({
        creator,
        template: getOutreachTemplate(creator),
      }));

      return NextResponse.json({
        success: true,
        outreach: outreachEmails,
        count: outreachEmails.length,
      });
    }

    if (action === 'send-outreach') {
      // Future: integrate with Resend to actually send
      // For now, return the templates for manual sending
      const selectedCreators = PIPELINE_DATA.filter(c => creatorIds.includes(c.id));
      const outreachEmails = selectedCreators.map(creator => ({
        creator,
        template: getOutreachTemplate(creator),
      }));

      return NextResponse.json({
        success: true,
        message: `Outreach prepared for ${outreachEmails.length} creators. Copy templates and send via Gmail.`,
        outreach: outreachEmails,
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Pipeline API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
