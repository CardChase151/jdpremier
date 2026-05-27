// Shared company content. Edit here, all pages update.

export const COMPANY = {
  name: 'JD Premier Logistics',
  short: 'JD Premier',
  location: 'Wills Point, TX',
  address: '210 Private Road 7801, Wills Point, TX',
  email: 'dispatch@jdpremierlog.com',
  quoteEmail: 'jacob@jdpremierlog.com',
  phone: '(903) 603-2732',
  phoneRaw: '9036032732',
  tagline: 'Where Logistics Meets Excellence.',
  blurb:
    "A 3rd-party logistics partner moving full-truckload, hot-shot, and specialized freight across North America. Based in Wills Point, Texas — built on trust, reliability, and performance.",
};

export const SERVICES = [
  {
    key: 'flatbed',
    title: 'Flatbed',
    blurb: 'Steel, lumber, construction materials, machinery — open-deck freight handled with secured tarping and chains.',
    icon: 'Wrench',
  },
  {
    key: 'dryvan',
    title: 'Dry Van',
    blurb: "Standard 53' dry van for palletized freight, consumer goods, and general commodities. Coast to coast.",
    icon: 'Package',
  },
  {
    key: 'reefer',
    title: 'Refrigerated',
    blurb: 'Temperature-controlled freight from frozen to climate-sensitive. Continuous monitoring with cold-chain compliance.',
    icon: 'Snowflake',
  },
  {
    key: 'heavyhaul',
    title: 'Heavy Haul',
    blurb: 'Permitted heavy and over-dimensional loads. Route surveys, escorts, and pilot cars coordinated end-to-end.',
    icon: 'Truck',
  },
  {
    key: 'oversize',
    title: 'Oversize',
    blurb: 'Wide-load and tall-load capacity. Permits secured across all 48 states plus Canada border crossings.',
    icon: 'Maximize',
  },
  {
    key: 'hotshot',
    title: 'Hot Shot / Box Truck',
    blurb: 'Time-critical freight. Hot shot pickups same-day, box trucks for LTL and partial loads moving fast.',
    icon: 'Zap',
  },
  {
    key: 'drayage',
    title: 'Drayage',
    blurb: 'Container drayage from major US ports to your warehouse. SSL, terminal, and chassis coordination handled end-to-end.',
    icon: 'Anchor',
  },
  {
    key: 'crossborder',
    title: 'Cross-Border',
    blurb: 'US, Mexico, and Canada freight with broker coordination. Customs paperwork, FAST/CTPAT carriers, and smooth handoffs at the border.',
    icon: 'Globe',
  },
];

// Three stats — fits a clean 3-up grid on desktop and stacks cleanly on phone.
export const STATS = [
  { value: '48',   label: 'States Served' },
  { value: '10+',  label: 'Years Experience' },
  { value: '24/7', label: 'Dispatch' },
];

export const VALUES = [
  {
    title: 'Service first.',
    body: "We're not a portal. You get a person. Real dispatch, real tracking, real follow-through.",
  },
  {
    title: 'Built on trust.',
    body: 'Every load matters. We move freight like our name is on it — because it is.',
  },
  {
    title: 'Texas-grown.',
    body: 'Headquartered in Wills Point, TX. We know the lanes, we know the carriers, we know the road.',
  },
];

// Story paragraphs for the About page (weaves Jacob's intake answers).
export const ABOUT_STORY = [
  'JD Premier Logistics was founded in 2026 to deliver freight solutions businesses can trust. We\'re led by professionals with over 10 years of freight and logistics experience — a young brokerage with industry-deep roots.',
  'Every customer gets a dispatcher who knows the load, knows the driver, and knows when the wheels are turning. We move full-truckload, hot-shot, drayage, cross-border, and specialized freight — and we treat every load like it has our name on it. Because it does.',
  "We're not the biggest 3PL out there. We don't want to be. We're growing a brokerage built on trust, reliability, and performance — and we want to be the one you trust when the load matters.",
];

// Hero image — local responsive JPEGs (truck-hero-{800,1200,1600}.jpg).
export const IMAGES = {
  heroFlatbed:        '/truck-hero-1200.jpg',
  heroFlatbedSrcSet:  '/truck-hero-800.jpg 800w, /truck-hero-1200.jpg 1200w, /truck-hero-1600.jpg 1600w',
};
