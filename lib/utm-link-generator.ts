// UTM Link Generator — Agency-Controlled Attribution Links
// You generate these. Jacob just pastes them. You control the tracking.

export interface UTMConfig {
  baseUrl: string; // e.g. 'https://p1simgear.com.au/collections/flight-sim-bundles'
  source: string; // Creator name: 'jacob_tabor'
  medium: string; // Channel: 'youtube' | 'instagram' | 'discord' | 'tiktok'
  campaign: string; // Campaign ID: 'p1_flight_jul2026'
  content?: string; // Post type: 'gear_breakdown' | 'skill_session' | 'reveal' | 'affiliate'
  term?: string; // Product: 'fighter_pilot_pack' | 'virpil_hosas'
}

export interface GeneratedLink {
  id: string;
  fullUrl: string;
  shortLabel: string;
  config: UTMConfig;
  creatorName: string;
  brandName: string;
  createdAt: string;
  // For Jacob's brief — copy-paste ready
  copyText: string;
}

export class UTMLinkGenerator {

  static generate(config: UTMConfig): string {
    const url = new URL(config.baseUrl);
    url.searchParams.set('utm_source', config.source);
    url.searchParams.set('utm_medium', config.medium);
    url.searchParams.set('utm_campaign', config.campaign);
    if (config.content) url.searchParams.set('utm_content', config.content);
    if (config.term) url.searchParams.set('utm_term', config.term);
    return url.toString();
  }

  // Generate a full set of links for a creator × brand campaign
  static generateCampaignLinkSet(params: {
    brandDomain: string;
    creatorHandle: string;
    creatorName: string;
    brandName: string;
    campaignId: string;
    products: Array<{ slug: string; name: string }>;
  }): GeneratedLink[] {
    const links: GeneratedLink[] = [];
    const base = `https://${params.brandDomain}`;
    const ts = new Date().toISOString();

    // 1. Main store link (general)
    links.push(this.createLink({
      baseUrl: base,
      source: params.creatorHandle,
      medium: 'youtube',
      campaign: params.campaignId,
      content: 'main_link',
    }, params.creatorName, params.brandName, 'Main Store Link (YouTube)', ts));

    // 2. Per-product links
    params.products.forEach(product => {
      links.push(this.createLink({
        baseUrl: `${base}/products/${product.slug}`,
        source: params.creatorHandle,
        medium: 'youtube',
        campaign: params.campaignId,
        content: 'product_link',
        term: product.slug,
      }, params.creatorName, params.brandName, `Product: ${product.name}`, ts));
    });

    // 3. Instagram bio link
    links.push(this.createLink({
      baseUrl: base,
      source: params.creatorHandle,
      medium: 'instagram',
      campaign: params.campaignId,
      content: 'bio_link',
    }, params.creatorName, params.brandName, 'Instagram Bio Link', ts));

    // 4. Discord link (pinned)
    links.push(this.createLink({
      baseUrl: base,
      source: params.creatorHandle,
      medium: 'discord',
      campaign: params.campaignId,
      content: 'pinned_link',
    }, params.creatorName, params.brandName, 'Discord Pinned Link', ts));

    // 5. Per content-type links (for monthly posts)
    ['gear_breakdown', 'skill_session', 'normal_content', 'reveal_upgrade'].forEach(contentType => {
      links.push(this.createLink({
        baseUrl: base,
        source: params.creatorHandle,
        medium: 'youtube',
        campaign: params.campaignId,
        content: contentType,
      }, params.creatorName, params.brandName, `YouTube: ${contentType.replace('_', ' ')}`, ts));
    });

    return links;
  }

  private static createLink(config: UTMConfig, creatorName: string, brandName: string, label: string, ts: string): GeneratedLink {
    const fullUrl = this.generate(config);
    return {
      id: `link_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      fullUrl,
      shortLabel: label,
      config,
      creatorName,
      brandName,
      createdAt: ts,
      copyText: fullUrl,
    };
  }

  // Generate Jacob × P1 links (ready to use)
  static getJacobP1Links(): GeneratedLink[] {
    return this.generateCampaignLinkSet({
      brandDomain: 'p1simgear.com.au',
      creatorHandle: 'jacob_tabor',
      creatorName: 'Jacob Tabor',
      brandName: 'P1 Sim Gear',
      campaignId: 'p1_flight_jul2026',
      products: [
        { slug: 'fighter-pilot-pack', name: 'Fighter Pilot Pack' },
        { slug: 'virpil-warbrd-d-hosas-bundle-alpha-prime-edition', name: 'VIRPIL HOSAS Bundle' },
        { slug: 'trak-racer-tr8-pro-flight-simulator-cockpit-flight-seat', name: 'TR8 Pro Flight' },
      ],
    });
  }

  // Format links as a brief attachment for Jacob (copy-paste into his descriptions)
  static formatForCreatorBrief(links: GeneratedLink[]): string {
    const lines = [
      '═══════════════════════════════════════════',
      'YOUR TRACKING LINKS — Use these in all content',
      '═══════════════════════════════════════════',
      '',
    ];

    links.forEach(link => {
      lines.push(`📎 ${link.shortLabel}`);
      lines.push(`   ${link.fullUrl}`);
      lines.push('');
    });

    lines.push('───────────────────────────────────────────');
    lines.push('PROMO CODE: JACOBDCS');
    lines.push('(mention in video + pin in comments)');
    lines.push('───────────────────────────────────────────');

    return lines.join('\n');
  }
}
