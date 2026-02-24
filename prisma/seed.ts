import { PrismaClient, CategorySlug } from "../src/generated/prisma"
import { hashSync } from "bcryptjs"

const prisma = new PrismaClient()

// ─── Categories ───

const categories = [
  { name: "General", slug: CategorySlug.general, description: "Top headlines and breaking stories from around the world.", color: "bg-slate-500" },
  { name: "Business", slug: CategorySlug.business, description: "Markets, finance, economy, and corporate news.", color: "bg-blue-500" },
  { name: "Technology", slug: CategorySlug.technology, description: "Latest in tech, startups, gadgets, and innovation.", color: "bg-violet-500" },
  { name: "Sports", slug: CategorySlug.sports, description: "Scores, highlights, and stories from the sports world.", color: "bg-green-500" },
  { name: "Entertainment", slug: CategorySlug.entertainment, description: "Movies, music, celebrities, and pop culture.", color: "bg-pink-500" },
  { name: "Health", slug: CategorySlug.health, description: "Wellness, medicine, fitness, and health research.", color: "bg-red-500" },
  { name: "Science", slug: CategorySlug.science, description: "Discoveries, space, environment, and scientific research.", color: "bg-amber-500" },
]

// ─── Articles (from mock-data) ───

const articles = [
  // GENERAL
  {
    slug: "global-leaders-gather-for-climate-summit-2026",
    title: "Global Leaders Gather for Historic Climate Summit in Geneva",
    description: "World leaders from over 150 nations convene to address escalating climate challenges and set ambitious new emission targets for the next decade.",
    content: `World leaders from more than 150 nations have gathered in Geneva for what is being called the most significant climate summit since the Paris Agreement. The three-day event aims to establish new binding commitments to reduce carbon emissions by 60% before 2035.\n\nThe summit comes amid growing urgency as global temperatures continue to rise. Scientists warn that without immediate and drastic action, the world could see irreversible climate tipping points within the next decade.\n\nUN Secretary-General opened the proceedings with a stark warning: "We are at a crossroads. The decisions made in this room over the next 72 hours will determine the future of our planet for generations to come."\n\nKey topics on the agenda include a global carbon pricing mechanism, funding for developing nations' green transitions, and stricter regulations on deforestation. Several major economies have already signaled their willingness to adopt more aggressive targets.\n\nEnvironmental groups have staged peaceful demonstrations outside the venue, calling for concrete action rather than empty promises. "We've heard enough words," said one protest organizer. "This summit must deliver real, measurable commitments."\n\nThe summit is expected to conclude with a joint declaration that could reshape international climate policy for the coming decade.`,
    author: "Sarah Mitchell",
    source: "World News Today",
    category: CategorySlug.general,
    imageUrl: "https://picsum.photos/seed/climate-summit/800/450",
    publishedAt: "2026-02-23T08:00:00Z",
    isFeatured: true,
    isTrending: true,
  },
  {
    slug: "un-announces-new-peacekeeping-initiative",
    title: "UN Announces Major New Peacekeeping Initiative in Eastern Africa",
    description: "The United Nations unveils a comprehensive peacekeeping program aimed at stabilizing conflict zones across Eastern Africa.",
    content: `The United Nations has announced a sweeping new peacekeeping initiative focused on Eastern Africa, deploying additional resources and personnel to address ongoing conflicts in the region.\n\nThe program, backed by a $2.3 billion funding commitment from member states, will expand peacekeeping operations in several key areas. The initiative includes not only military peacekeepers but also humanitarian aid workers, mediators, and reconstruction specialists.\n\n"This is a holistic approach to peace," said the UN representative. "Military presence alone cannot solve these complex conflicts. We need development, education, and dialogue."\n\nThe initiative has received broad international support, with major contributors including the European Union, the United States, and several African nations. Local leaders have expressed cautious optimism about the program's potential impact.\n\nCritics, however, have raised concerns about the sustainability of such large-scale operations and called for greater involvement of local communities in the peace process.`,
    author: "James Okonkwo",
    source: "Global Affairs",
    category: CategorySlug.general,
    imageUrl: "https://picsum.photos/seed/un-peace/800/450",
    publishedAt: "2026-02-22T14:30:00Z",
    isFeatured: false,
    isTrending: true,
  },
  {
    slug: "historic-election-reforms-sweep-across-europe",
    title: "Historic Election Reforms Sweep Across European Democracies",
    description: "Multiple European countries adopt sweeping electoral reforms aimed at increasing voter participation and transparency.",
    content: `In a wave of democratic renewal, several European countries have simultaneously adopted major electoral reforms. The changes include ranked-choice voting systems, mandatory transparency requirements for political advertising, and expanded early voting periods.\n\nThe reforms come in response to declining voter turnout across the continent and growing concerns about the influence of misinformation on elections. Proponents say the changes will reinvigorate democratic participation and restore public trust in the electoral process.\n\n"Democracy must evolve to remain relevant," said one EU parliament member. "These reforms represent the most significant update to our electoral systems in decades."\n\nThe changes have been met with widespread public approval, with polls showing over 70% support in most countries. Implementation is expected to begin ahead of the next round of national elections.`,
    author: "Elena Kowalski",
    source: "European Observer",
    category: CategorySlug.general,
    imageUrl: "https://picsum.photos/seed/election-reform/800/450",
    publishedAt: "2026-02-21T10:15:00Z",
    isFeatured: false,
    isTrending: false,
  },

  // BUSINESS
  {
    slug: "global-markets-surge-on-trade-deal",
    title: "Global Markets Surge as US and EU Finalize Landmark Trade Agreement",
    description: "Stock markets worldwide rally after the announcement of a comprehensive trade deal between the United States and European Union.",
    content: `Global stock markets experienced their biggest single-day gains in over two years following the announcement of a landmark trade agreement between the United States and the European Union.\n\nThe deal, which has been under negotiation for over 18 months, eliminates tariffs on a wide range of goods and establishes new frameworks for digital trade, intellectual property protection, and environmental standards.\n\nWall Street led the rally with the S&P 500 climbing 3.2%, while European indices saw similar gains. The deal is expected to boost bilateral trade by an estimated $400 billion annually.\n\n"This agreement sets a new standard for international trade cooperation," said the US Trade Representative. "It shows that major economies can find common ground on even the most complex issues."\n\nTech stocks were among the biggest winners, as the deal includes provisions that simplify cross-border data flows and digital services. Small and medium businesses are also expected to benefit from reduced regulatory barriers.\n\nEconomists predict the agreement could add 0.5% to GDP growth in both regions over the next three years.`,
    author: "Michael Chen",
    source: "Financial Times Global",
    category: CategorySlug.business,
    imageUrl: "https://picsum.photos/seed/trade-deal/800/450",
    publishedAt: "2026-02-23T06:45:00Z",
    isFeatured: true,
    isTrending: true,
  },
  {
    slug: "startup-unicorn-revolutionizes-supply-chain",
    title: "Supply Chain Startup Reaches $10B Valuation After Record Funding Round",
    description: "A logistics technology startup has become the fastest company to reach a $10 billion valuation, promising to reshape global supply chains.",
    content: `LogiFlow, a three-year-old supply chain technology startup, has achieved a $10 billion valuation following a $1.5 billion Series D funding round. The company's AI-powered logistics platform has attracted major clients including several Fortune 500 companies.\n\nThe platform uses machine learning to optimize shipping routes, predict demand fluctuations, and reduce waste across the entire supply chain. Early adopters report cost savings of 20-30% and significant reductions in delivery times.\n\n"We're not just improving supply chains, we're reimagining them from the ground up," said the company's CEO. "Every product that moves from factory to consumer can be tracked, optimized, and delivered more efficiently."\n\nThe funding round was led by prominent venture capital firms, with participation from several sovereign wealth funds. The company plans to use the capital to expand into new markets and develop additional AI capabilities.\n\nIndustry analysts say LogiFlow represents a new generation of enterprise technology companies that are applying cutting-edge AI to solve real-world operational challenges.`,
    author: "Priya Sharma",
    source: "TechCrunch",
    category: CategorySlug.business,
    imageUrl: "https://picsum.photos/seed/startup-unicorn/800/450",
    publishedAt: "2026-02-22T09:20:00Z",
    isFeatured: false,
    isTrending: false,
  },
  {
    slug: "central-banks-coordinate-rate-decisions",
    title: "Major Central Banks Coordinate Interest Rate Decisions in Rare Move",
    description: "The Federal Reserve, ECB, and Bank of England announce coordinated rate adjustments to stabilize the global economy.",
    content: `In an unprecedented display of international monetary coordination, three of the world's most powerful central banks have announced synchronized interest rate decisions aimed at stabilizing the global economy.\n\nThe Federal Reserve, European Central Bank, and Bank of England each announced measured rate adjustments designed to balance inflation control with economic growth. The coordinated move signals a new era of central bank cooperation.\n\n"We recognized that in today's interconnected economy, isolated monetary decisions can have unintended global consequences," said the Federal Reserve Chair. "This coordinated approach allows us to achieve our domestic objectives while minimizing disruption to global markets."\n\nBond markets responded positively to the announcement, with yields stabilizing across major economies. Currency markets also showed reduced volatility following the coordinated decisions.\n\nEconomists have praised the move as a mature response to the complex challenges facing the global economy, though some worry about the precedent of central banks coordinating policy decisions.`,
    author: "Robert Hughes",
    source: "Bloomberg",
    category: CategorySlug.business,
    imageUrl: "https://picsum.photos/seed/central-banks/800/450",
    publishedAt: "2026-02-20T16:00:00Z",
    isFeatured: false,
    isTrending: true,
  },

  // TECHNOLOGY
  {
    slug: "breakthrough-quantum-computing-milestone",
    title: "Scientists Achieve Major Quantum Computing Breakthrough with 1000-Qubit Processor",
    description: "Researchers demonstrate a stable 1000-qubit quantum processor, bringing practical quantum computing closer to reality than ever before.",
    content: `A team of researchers has achieved what many considered impossible just five years ago: a stable, error-corrected quantum processor with over 1,000 qubits. The breakthrough, announced at the International Quantum Computing Conference, marks a pivotal moment in the race toward practical quantum computing.\n\nThe processor, developed through a collaboration between leading universities and tech companies, maintained coherence for record-breaking durations, allowing complex calculations that would take classical supercomputers thousands of years.\n\n"This is the Wright Brothers moment for quantum computing," said the lead researcher. "We've shown that large-scale, reliable quantum computation is not just theoretically possible — it's here."\n\nThe implications are staggering. The technology could revolutionize drug discovery by simulating molecular interactions with unprecedented precision. It could also transform cryptography, materials science, and artificial intelligence.\n\nHowever, experts caution that significant engineering challenges remain before quantum computers become commercially available. The current system requires extreme cooling and isolation from external interference, making it impractical for everyday use.\n\nSeveral major tech companies have already announced plans to license the technology, and governments worldwide are increasing funding for quantum research programs.`,
    author: "Dr. Lisa Wang",
    source: "MIT Technology Review",
    category: CategorySlug.technology,
    imageUrl: "https://picsum.photos/seed/quantum-computing/800/450",
    publishedAt: "2026-02-23T07:15:00Z",
    isFeatured: true,
    isTrending: true,
  },
  {
    slug: "ai-coding-assistant-transforms-development",
    title: "New AI Coding Assistant Can Build Full Applications from Natural Language",
    description: "A revolutionary AI tool can now generate complete, production-ready applications from plain English descriptions.",
    content: `A new AI-powered coding assistant has demonstrated the ability to generate complete, production-ready applications from natural language descriptions. The tool, which builds on recent advances in large language models, can understand complex requirements and produce well-structured code across multiple programming languages.\n\nIn demonstrations, the assistant created fully functional web applications, mobile apps, and backend services from conversational prompts. The generated code includes proper error handling, security best practices, and comprehensive test suites.\n\n"We're not replacing developers," emphasized the company's CTO. "We're giving them superpowers. This tool handles the routine work so developers can focus on creative problem-solving and architecture."\n\nEarly beta users report productivity improvements of 3-5x for standard development tasks. The tool is particularly effective for boilerplate code, API integrations, and UI component creation.\n\nThe announcement has sparked both excitement and debate in the developer community, with some praising the potential for democratizing software development and others raising concerns about code quality and job displacement.`,
    author: "Alex Rivera",
    source: "The Verge",
    category: CategorySlug.technology,
    imageUrl: "https://picsum.photos/seed/ai-coding/800/450",
    publishedAt: "2026-02-22T11:30:00Z",
    isFeatured: false,
    isTrending: true,
  },
  {
    slug: "next-gen-solar-panels-efficiency-record",
    title: "Next-Generation Solar Panels Shatter Efficiency Records at 47%",
    description: "A new type of perovskite-silicon tandem solar cell achieves 47% efficiency, potentially halving the cost of solar energy.",
    content: `Engineers have set a new world record for solar cell efficiency, achieving 47% energy conversion with a novel perovskite-silicon tandem design. The breakthrough could dramatically reduce the cost of solar energy and accelerate the global transition to renewable power.\n\nThe new cells use a layered approach that captures different wavelengths of light more effectively than traditional silicon panels. The top perovskite layer absorbs high-energy blue light, while the bottom silicon layer captures lower-energy red and infrared light.\n\n"This is a game-changer for the solar industry," said the project lead. "At 47% efficiency, solar panels can generate the same power with half the surface area, making them viable in locations previously considered unsuitable."\n\nManufacturing costs are expected to be competitive with existing solar technology within two to three years. Several major solar manufacturers have already expressed interest in licensing the technology.\n\nThe development could have far-reaching implications for global energy policy and climate change mitigation efforts.`,
    author: "Dr. Kenji Nakamura",
    source: "Nature Energy",
    category: CategorySlug.technology,
    imageUrl: "https://picsum.photos/seed/solar-panels/800/450",
    publishedAt: "2026-02-21T08:45:00Z",
    isFeatured: false,
    isTrending: false,
  },

  // SPORTS
  {
    slug: "underdog-team-wins-championship-in-stunning-upset",
    title: "Underdog Team Wins Championship in Most Stunning Upset in Decades",
    description: "A team that was given 200-to-1 odds at the start of the season captures the championship title in a dramatic final.",
    content: `In what sports analysts are calling the greatest upset in modern championship history, a team that began the season with 200-to-1 odds has captured the title in a dramatic final that will be remembered for generations.\n\nThe decisive game saw the underdogs overcome a 15-point deficit in the final quarter, culminating in a last-second play that sealed their improbable victory. The stadium erupted as the final buzzer sounded, with fans storming the court in wild celebration.\n\n"Nobody believed in us except the people in this locker room," said the team captain, fighting back tears. "This proves that anything is possible if you work hard enough and believe in each other."\n\nThe coach, a first-year hire who was initially criticized as an unconventional choice, has been hailed as a tactical genius. The team's journey from the bottom of the standings to champions is already being called the greatest sports story of the decade.\n\nTicket prices for their next season have already tripled, and the team's merchandise has sold out nationwide.`,
    author: "Marcus Johnson",
    source: "ESPN",
    category: CategorySlug.sports,
    imageUrl: "https://picsum.photos/seed/championship-upset/800/450",
    publishedAt: "2026-02-22T22:00:00Z",
    isFeatured: true,
    isTrending: true,
  },
  {
    slug: "olympic-committee-announces-new-sports-2030",
    title: "Olympic Committee Adds Five New Sports for 2030 Winter Games",
    description: "The IOC announces the addition of five new sports to the 2030 Winter Olympic program, including two that have never been in the Games.",
    content: `The International Olympic Committee has announced the addition of five new sports to the 2030 Winter Olympics program. The additions reflect the evolving landscape of winter sports and aim to attract younger audiences to the Games.\n\nAmong the new additions are ski mountaineering and ice cross downhill, two high-adrenaline sports that have gained massive followings in recent years. The other additions include updates to existing disciplines that expand participation opportunities.\n\n"The Olympic Games must evolve with the times," said the IOC President. "These sports bring incredible athleticism, excitement, and a new generation of fans to the Winter Olympics."\n\nAthletes from the newly included sports have expressed overwhelming joy at the announcement. "This is a dream come true for our entire community," said one ski mountaineering champion. "We've worked for years to get this recognition."\n\nThe decision was made following extensive consultation with national Olympic committees, international sports federations, and athlete representatives.`,
    author: "Sophia Andersson",
    source: "Olympic Channel",
    category: CategorySlug.sports,
    imageUrl: "https://picsum.photos/seed/olympics-2030/800/450",
    publishedAt: "2026-02-21T15:45:00Z",
    isFeatured: false,
    isTrending: false,
  },
  {
    slug: "young-tennis-prodigy-breaks-records",
    title: "17-Year-Old Tennis Prodigy Shatters Grand Slam Records",
    description: "The youngest player in 30 years to reach a Grand Slam final delivers a masterclass performance to claim the title.",
    content: `A 17-year-old tennis sensation has rewritten the record books by becoming the youngest Grand Slam champion in three decades. The prodigy delivered a flawless performance in the final, dispatching the world number one in straight sets.\n\nThe match showcased extraordinary talent that belied the player's age. Powerful serves, precise volleys, and an unshakeable mental composure left spectators and commentators in awe.\n\n"I've been dreaming of this moment since I first picked up a racket at age four," said the new champion. "I want to thank my family, my coach, and everyone who believed in me."\n\nThe victory has drawn comparisons to the early careers of tennis legends. Coaches and analysts predict a bright future, with many suggesting this could be the beginning of a new era in the sport.\n\nEndorsement offers have already begun pouring in, and the player's social media following has exploded overnight.`,
    author: "David Torres",
    source: "Tennis Weekly",
    category: CategorySlug.sports,
    imageUrl: "https://picsum.photos/seed/tennis-prodigy/800/450",
    publishedAt: "2026-02-20T19:30:00Z",
    isFeatured: false,
    isTrending: false,
  },

  // ENTERTAINMENT
  {
    slug: "indie-film-sweeps-awards-season",
    title: "Low-Budget Indie Film Sweeps Awards Season with Seven Major Wins",
    description: "A film made for under $5 million has dominated this year's awards circuit, winning seven major awards including Best Picture.",
    content: `An independent film made on a modest budget of under $5 million has swept this year's awards season, capturing seven major awards including the prestigious Best Picture honor. The achievement has been hailed as a triumph of storytelling over spectacle.\n\nThe film, shot in just 28 days with a largely unknown cast, tells a deeply personal story that has resonated with audiences and critics alike. Its success at the box office — earning over $200 million worldwide — has shattered assumptions about what indie cinema can achieve.\n\n"This film proves that great stories don't need massive budgets," said the director during the acceptance speech. "They need heart, authenticity, and characters that people can see themselves in."\n\nThe lead actor, discovered through an open casting call, has become an overnight sensation. Studio executives are already in talks for a potential sequel, though the director has expressed interest in maintaining the film's artistic integrity.\n\nThe success has sparked renewed interest in independent filmmaking, with several studios announcing new programs to fund low-budget productions.`,
    author: "Rachel Kim",
    source: "Variety",
    category: CategorySlug.entertainment,
    imageUrl: "https://picsum.photos/seed/indie-film/800/450",
    publishedAt: "2026-02-22T20:15:00Z",
    isFeatured: true,
    isTrending: true,
  },
  {
    slug: "streaming-platform-launches-interactive-series",
    title: "Major Streaming Platform Launches First Fully Interactive TV Series",
    description: "Viewers can make real-time decisions that change the plot, creating millions of unique story combinations.",
    content: `A major streaming platform has launched what it calls the world's first fully interactive television series, allowing viewers to make decisions in real-time that fundamentally alter the show's narrative.\n\nUnlike previous interactive experiments, which offered limited branching paths, the new series uses advanced AI to generate truly unique storylines based on viewer choices. The technology creates millions of possible narrative combinations, meaning no two viewing experiences are alike.\n\n"Traditional television is a one-way medium," said the show's creator. "We wanted to create something that feels more like a conversation between the storyteller and the audience."\n\nEarly reviews have been overwhelmingly positive, with critics praising both the technological innovation and the quality of the writing. The series has already become the platform's most-watched launch in history.\n\nThe technology behind the series has implications beyond entertainment, with potential applications in education, training, and therapeutic contexts.`,
    author: "Chris Martinez",
    source: "Entertainment Weekly",
    category: CategorySlug.entertainment,
    imageUrl: "https://picsum.photos/seed/interactive-series/800/450",
    publishedAt: "2026-02-21T12:00:00Z",
    isFeatured: false,
    isTrending: false,
  },
  {
    slug: "legendary-band-announces-reunion-world-tour",
    title: "Legendary Rock Band Announces Surprise Reunion World Tour",
    description: "After 15 years apart, one of the most iconic rock bands in history announces a massive 50-city world tour.",
    content: `One of the most iconic rock bands in history has announced a surprise reunion world tour, sending fans into a frenzy. The 50-city tour, spanning six continents, will mark the band's first performances together in 15 years.\n\nThe announcement came via a cryptic social media post that crashed the band's website within minutes. Pre-sale tickets sold out in under 90 seconds for several venues, breaking records across multiple ticketing platforms.\n\n"The music brought us together, and the music has brought us back," said the band's lead singer in a statement. "We have unfinished business with our fans."\n\nThe tour will feature a mix of classic hits and new material, with the band confirming they have been secretly recording a new album. Concert industry experts predict the tour could gross over $500 million, making it one of the highest-grossing tours in history.\n\nFan communities around the world have already begun organizing meetups and tribute events in anticipation of the shows.`,
    author: "Nina Patel",
    source: "Rolling Stone",
    category: CategorySlug.entertainment,
    imageUrl: "https://picsum.photos/seed/band-reunion/800/450",
    publishedAt: "2026-02-20T14:00:00Z",
    isFeatured: false,
    isTrending: true,
  },

  // HEALTH
  {
    slug: "universal-flu-vaccine-enters-final-trials",
    title: "Universal Flu Vaccine Enters Final Clinical Trials with Promising Results",
    description: "A single-shot vaccine designed to protect against all flu strains shows 95% efficacy in Phase 2 trials.",
    content: `A universal flu vaccine that could eliminate the need for annual flu shots has entered final-stage clinical trials after showing 95% efficacy against all known influenza strains in Phase 2 testing.\n\nThe vaccine works by targeting a part of the flu virus that remains constant across all strains, rather than the rapidly mutating surface proteins targeted by current vaccines. This approach could provide lifelong protection from a single dose.\n\n"This is the holy grail of influenza research," said the lead investigator. "If the Phase 3 results hold, we could see the end of seasonal flu epidemics as we know them."\n\nThe Phase 3 trial involves 30,000 participants across 15 countries and is expected to deliver results within 12 months. If successful, the vaccine could receive emergency authorization by early next year.\n\nThe development has been welcomed by the World Health Organization, which estimates that seasonal flu causes up to 650,000 deaths worldwide each year. The vaccine could save countless lives, particularly among vulnerable populations including the elderly and immunocompromised.`,
    author: "Dr. Amanda Foster",
    source: "The Lancet",
    category: CategorySlug.health,
    imageUrl: "https://picsum.photos/seed/flu-vaccine/800/450",
    publishedAt: "2026-02-23T05:30:00Z",
    isFeatured: true,
    isTrending: true,
  },
  {
    slug: "mental-health-workplace-programs-show-results",
    title: "Workplace Mental Health Programs Show Dramatic Improvements in Employee Wellbeing",
    description: "A major study reveals that companies with comprehensive mental health programs see 40% reduction in burnout and 25% increase in productivity.",
    content: `A landmark study spanning 500 companies and over 200,000 employees has found that comprehensive workplace mental health programs lead to dramatic improvements in employee wellbeing and business outcomes.\n\nCompanies that implemented robust mental health support — including counseling services, flexible work arrangements, and mental health days — saw burnout rates drop by 40% and productivity increase by 25%. Employee turnover also decreased by 30%.\n\n"The business case for mental health investment is now undeniable," said the study's principal investigator. "Companies that care for their employees' mental wellbeing see direct returns to their bottom line."\n\nThe study found that the most effective programs combined professional counseling access with structural changes like reduced meeting loads, protected focus time, and genuine flexibility in work schedules.\n\nThe findings have prompted several major corporations to announce expanded mental health benefits, and policymakers in multiple countries are considering legislation to mandate basic mental health support in workplaces.`,
    author: "Dr. Sarah Williams",
    source: "Harvard Business Review",
    category: CategorySlug.health,
    imageUrl: "https://picsum.photos/seed/mental-health/800/450",
    publishedAt: "2026-02-21T09:00:00Z",
    isFeatured: false,
    isTrending: false,
  },
  {
    slug: "breakthrough-alzheimers-treatment-reverses-symptoms",
    title: "Breakthrough Alzheimer's Treatment Shows Ability to Reverse Early Symptoms",
    description: "A new combination therapy demonstrates unprecedented results in reversing cognitive decline in early-stage Alzheimer's patients.",
    content: `Researchers have announced results from a clinical trial showing that a new combination therapy can reverse cognitive decline in early-stage Alzheimer's patients. The treatment, which combines a novel drug with targeted brain stimulation, showed significant improvements in memory and cognitive function.\n\nIn the 18-month trial involving 400 patients, those receiving the combination therapy showed not just a slowing of decline but actual improvement in cognitive test scores. Some patients recovered abilities they had lost months or even years earlier.\n\n"We've never seen results like this in Alzheimer's research," said the neurologist leading the trial. "For the first time, we're not just slowing the disease — we're pushing it back."\n\nThe treatment works by clearing toxic protein buildup in the brain while simultaneously stimulating the formation of new neural connections. The dual approach addresses both the cause and effects of the disease.\n\nThe results have been met with cautious optimism from the medical community, with experts calling for larger trials to confirm the findings. If validated, the treatment could transform care for the estimated 55 million people worldwide living with dementia.`,
    author: "Dr. Richard Park",
    source: "New England Journal of Medicine",
    category: CategorySlug.health,
    imageUrl: "https://picsum.photos/seed/alzheimers/800/450",
    publishedAt: "2026-02-19T07:00:00Z",
    isFeatured: false,
    isTrending: false,
  },

  // SCIENCE
  {
    slug: "james-webb-discovers-signs-of-life",
    title: "James Webb Telescope Detects Potential Biosignatures on Nearby Exoplanet",
    description: "NASA announces the detection of atmospheric compounds strongly associated with biological activity on a planet just 40 light-years away.",
    content: `NASA has announced that the James Webb Space Telescope has detected atmospheric compounds strongly associated with biological activity on an exoplanet located just 40 light-years from Earth. The discovery has sent shockwaves through the scientific community.\n\nThe telescope identified a combination of gases — including methane, carbon dioxide, and dimethyl sulfide — in the atmosphere of the planet, which orbits within its star's habitable zone. On Earth, dimethyl sulfide is produced almost exclusively by living organisms.\n\n"While we cannot yet confirm the presence of life, this is the strongest evidence we've ever found that we may not be alone in the universe," said NASA's chief scientist. "These biosignatures are exactly what we would expect to see on a planet harboring life."\n\nThe planet, which is roughly 1.5 times the size of Earth, has surface temperatures and atmospheric pressure compatible with liquid water. Follow-up observations are already being planned with multiple telescopes to verify and expand upon the findings.\n\nThe announcement has reignited public interest in space exploration and prompted calls for increased funding for astrobiology research. Scientists caution that definitive proof of extraterrestrial life would require more detailed analysis, potentially taking years of additional observation.`,
    author: "Dr. Emily Zhang",
    source: "NASA",
    category: CategorySlug.science,
    imageUrl: "https://picsum.photos/seed/exoplanet-life/800/450",
    publishedAt: "2026-02-23T04:00:00Z",
    isFeatured: true,
    isTrending: true,
  },
  {
    slug: "ocean-floor-mapping-reveals-hidden-ecosystems",
    title: "Deep Ocean Mapping Project Reveals Vast Hidden Ecosystems",
    description: "An international ocean mapping initiative discovers thousands of previously unknown species in unexplored deep-sea environments.",
    content: `An ambitious international project to map the entire ocean floor has revealed vast, previously unknown ecosystems teeming with life in some of the deepest and most remote parts of the world's oceans.\n\nUsing advanced autonomous underwater vehicles and AI-powered imaging systems, researchers have documented over 5,000 previously unknown species across multiple ocean basins. The discoveries include bioluminescent organisms, unique coral formations, and bacteria that thrive in extreme conditions.\n\n"We've explored more of Mars' surface than our own ocean floor," said the project's chief scientist. "These discoveries remind us that Earth still holds incredible secrets."\n\nAmong the most significant findings are hydrothermal vent communities that exist at depths previously thought to be devoid of complex life. These ecosystems operate entirely independently of sunlight, deriving energy from chemical reactions in the Earth's crust.\n\nThe project has also raised important questions about ocean conservation, as several of the newly discovered ecosystems are located in areas targeted for deep-sea mining. Environmental groups are calling for immediate protections for these unique habitats.`,
    author: "Dr. Marco Rossi",
    source: "National Geographic",
    category: CategorySlug.science,
    imageUrl: "https://picsum.photos/seed/ocean-mapping/800/450",
    publishedAt: "2026-02-22T06:30:00Z",
    isFeatured: false,
    isTrending: false,
  },
  {
    slug: "fusion-energy-plant-breaks-even-commercially",
    title: "First Commercial Fusion Energy Plant Achieves Net Energy Gain",
    description: "A private fusion energy company achieves sustained net energy gain, marking the dawn of the fusion energy age.",
    content: `A private fusion energy company has achieved a historic milestone: sustained net energy gain from a commercial-scale fusion reactor. The achievement means the reactor produced more energy than was needed to initiate and maintain the fusion reaction.\n\nThe reactor maintained a stable fusion reaction for over four hours, generating enough power to supply approximately 10,000 homes. While the achievement is still far from the scale needed for grid-level power generation, it proves that commercial fusion energy is achievable.\n\n"Today, fusion energy moved from the realm of scientific experiment to engineering challenge," said the company's chief scientist. "The physics works. Now we need to scale it up."\n\nThe company plans to build a full-scale power plant capable of generating 500 megawatts of clean energy by 2032. The technology produces no greenhouse gases and generates minimal radioactive waste compared to traditional nuclear fission reactors.\n\nThe breakthrough has attracted significant investor interest, with several governments and major energy companies expressing interest in partnerships. If fusion can be scaled commercially, it could provide virtually unlimited clean energy.`,
    author: "Dr. James Chen",
    source: "Science Magazine",
    category: CategorySlug.science,
    imageUrl: "https://picsum.photos/seed/fusion-energy/800/450",
    publishedAt: "2026-02-20T11:00:00Z",
    isFeatured: false,
    isTrending: true,
  },
]

// ─── Main Seed Function ───

async function main() {
  console.log("🌱 Seeding database...")

  // 1. Upsert categories
  const categoryMap = new Map<CategorySlug, string>()
  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description, color: cat.color },
      create: cat,
    })
    categoryMap.set(cat.slug, created.id)
  }
  console.log(`  Categories: ${categoryMap.size}`)

  // 2. Create author users from unique author names in articles
  const authorNames = [...new Set(articles.map((a) => a.author))]
  const authorMap = new Map<string, string>()

  for (const name of authorNames) {
    const email = name.toLowerCase().replace(/\s+/g, ".").replace(/dr\.\s*/i, "") + "@dailynews.com"
    const user = await prisma.user.upsert({
      where: { email },
      update: { name },
      create: {
        name,
        email,
        password: hashSync("author123", 10),
        role: "AUTHOR",
      },
    })
    authorMap.set(name, user.id)
  }
  console.log(`  Authors: ${authorMap.size}`)

  // 3. Create admin user
  await prisma.user.upsert({
    where: { email: "admin@dailynews.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@dailynews.com",
      password: hashSync("admin123", 10),
      role: "ADMIN",
    },
  })
  console.log("  Admin user created")

  // 4. Create editor user
  await prisma.user.upsert({
    where: { email: "editor@dailynews.com" },
    update: {},
    create: {
      name: "Editor",
      email: "editor@dailynews.com",
      password: hashSync("editor123", 10),
      role: "EDITOR",
    },
  })
  console.log("  Editor user created")

  // 5. Upsert all articles
  for (const article of articles) {
    const authorId = authorMap.get(article.author)!
    const categoryId = categoryMap.get(article.category)!

    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {
        title: article.title,
        description: article.description,
        content: article.content,
        imageUrl: article.imageUrl,
        source: article.source,
        status: "PUBLISHED",
        isFeatured: article.isFeatured,
        isTrending: article.isTrending,
        publishedAt: new Date(article.publishedAt),
        authorId,
        categoryId,
      },
      create: {
        slug: article.slug,
        title: article.title,
        description: article.description,
        content: article.content,
        imageUrl: article.imageUrl,
        source: article.source,
        status: "PUBLISHED",
        isFeatured: article.isFeatured,
        isTrending: article.isTrending,
        publishedAt: new Date(article.publishedAt),
        authorId,
        categoryId,
      },
    })
  }
  console.log(`  Articles: ${articles.length}`)

  // 6. Default site settings
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteName: "Daily News",
      tagline: "Your Trusted News Source",
      seoDescription: "Stay informed with the latest breaking news, top stories, and in-depth coverage across business, technology, sports, entertainment, health, and science.",
      contactEmail: "contact@dailynews.com",
    },
  })
  console.log("  Site settings created")

  console.log("✅ Seed complete!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
