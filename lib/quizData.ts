import type {
  ChoiceOption,
  DestinationId,
  Dimension,
  QuestionDef,
  SalaryTier,
} from "./types";

export const siteTitle = {
  zh: "留英vs回国vs其他地方 - 测一测哪里是你的打工圣地",
  en: "Stay in the UK vs. Go Home vs. Somewhere Else — Find Your Ideal Job Destination",
};

export const majorOptions: ChoiceOption[] = [
  { id: "cs", label: { zh: "计算机", en: "Computer Science" }, score: 2 },
  { id: "data", label: { zh: "数据", en: "Data Science" }, score: 1 },
  { id: "finance", label: { zh: "金融", en: "Finance" }, score: 1 },
  { id: "engineering", label: { zh: "工程", en: "Engineering" }, score: 1 },
  { id: "economics", label: { zh: "经济学", en: "Economics" }, score: 1 },
  { id: "accounting", label: { zh: "会计", en: "Accounting" }, score: 1 },
  { id: "law", label: { zh: "法律", en: "Law" }, score: 1 },
  { id: "actuarial", label: { zh: "精算", en: "Actuarial Science" }, score: 2 },
  { id: "management", label: { zh: "管理学/MBA", en: "Management/MBA" }, score: 1 },
  { id: "realestate", label: { zh: "房地产", en: "Real Estate" }, score: 1 },
  { id: "pms", label: { zh: "物理/数学/统计", en: "Physics/Math/Statistics" }, score: 1 },
  { id: "chemmat", label: { zh: "化学/材料", en: "Chemistry/Materials" }, score: 0 },
  { id: "biomed", label: { zh: "生物/医学预科", en: "Biology/Pre-Med" }, score: 0 },
  { id: "publicpolicy", label: { zh: "公共政策/国际关系", en: "Public Policy/Int'l Relations" }, score: -1 },
  { id: "psychology", label: { zh: "心理学", en: "Psychology" }, score: -1 },
  { id: "art", label: { zh: "艺术", en: "Art" }, score: -2 },
  { id: "architecture", label: { zh: "建筑", en: "Architecture" }, score: -2 },
  { id: "marketing", label: { zh: "市场营销", en: "Marketing" }, score: -2 },
  { id: "media", label: { zh: "传媒/新闻传播", en: "Media/Journalism" }, score: -2 },
  { id: "education", label: { zh: "教育学", en: "Education" }, score: -2 },
  { id: "languages", label: { zh: "语言/翻译", en: "Languages/Translation" }, score: -2 },
  { id: "historyphilsoc", label: { zh: "历史/哲学/社会学", en: "History/Philosophy/Sociology" }, score: -2 },
  { id: "hospitality", label: { zh: "酒店与旅游管理", en: "Hospitality/Tourism Management" }, score: -2 },
  { id: "fashion", label: { zh: "时尚设计", en: "Fashion Design" }, score: -2 },
];

// Majors that get +2 on the top / upper-mid salary-expectation tiers, -2 otherwise.
export const highTierSalaryMajors = new Set(["cs", "finance"]);
// Majors that get +2 on the lower-mid salary-expectation tier, -2 otherwise.
export const lowTierSalaryMajors = new Set(["cs", "finance", "data", "economics"]);

export const salaryTiers: SalaryTier[] = [
  { id: "top", gbpMin: 100000, gbpMax: null },
  { id: "uppermid", gbpMin: 50000, gbpMax: 100000 },
  { id: "lowermid", gbpMin: 30000, gbpMax: 50000 },
  { id: "doesntmatter", gbpMin: null, gbpMax: null },
];

export const fallbackRates = { cny: 9.05, usd: 1.34 };

export const questions: QuestionDef[] = [
  {
    id: "gender",
    type: "choice",
    dimension: "humanities",
    title: { zh: "性别", en: "Gender" },
    options: [
      { id: "female", label: { zh: "女", en: "Female" }, score: 1 },
      { id: "male", label: { zh: "男", en: "Male" }, score: -1 },
      { id: "other", label: { zh: "其他", en: "Other" }, score: 2 },
    ],
  },
  {
    id: "major",
    type: "major",
    dimension: "salary",
    title: { zh: "专业", en: "What's your major?" },
    options: majorOptions,
  },
  {
    id: "passport",
    type: "choice",
    dimension: "difficulty",
    title: { zh: "护照", en: "Passport" },
    options: [
      { id: "china", label: { zh: "中国", en: "China" }, score: -1 },
      { id: "uk", label: { zh: "英国", en: "UK" }, score: 2 },
      { id: "us", label: { zh: "美国", en: "US" }, score: 2, isUSPassport: true },
      { id: "europe", label: { zh: "欧洲", en: "Europe" }, score: 2 },
      { id: "other", label: { zh: "其他", en: "Other" }, score: 0 },
    ],
  },
  {
    id: "salaryExpectation",
    type: "salary",
    dimension: "salary",
    title: { zh: "我对工资的期望是", en: "My salary expectation is" },
    tiers: salaryTiers,
  },
  {
    id: "english",
    type: "likert",
    dimension: "difficulty",
    title: {
      zh: "我的英文很好，甚至还会第三种语言！",
      en: "My English is excellent — I even speak a third language!",
    },
  },
  {
    id: "experience",
    type: "likert",
    dimension: "humanities",
    title: { zh: "人生最重要的是体验", en: "Experience is the most important thing in life" },
  },
  {
    id: "convenience",
    type: "likert",
    dimension: "convenience",
    title: {
      zh: "生活方便、购物方便对我来说很重要",
      en: "Convenience and easy shopping matter a lot to me",
    },
  },
  {
    id: "money",
    type: "likert",
    dimension: "salary",
    title: { zh: "我想赚钱", en: "I want to make money" },
  },
  {
    id: "careerDrive",
    type: "likert",
    dimension: "salary",
    title: { zh: "我的事业心很重！", en: "I'm very career-driven!" },
  },
  {
    id: "humanitiesInterest",
    type: "likert",
    dimension: "humanities",
    title: {
      zh: "我对人文艺术、历史、文学、哲学类感兴趣",
      en: "I'm interested in humanities, art, history, and philosophy",
    },
  },
  {
    id: "travel",
    type: "likert",
    dimension: "humanities",
    title: { zh: "我喜欢旅游", en: "I love traveling" },
  },
  {
    id: "nature",
    type: "likert",
    dimension: "convenience",
    reverse: true,
    title: {
      zh: "我喜欢自然风光多于城市CBD和shopping mall",
      en: "I prefer nature over city CBDs and shopping malls",
    },
  },
  {
    id: "wlb",
    type: "likert",
    dimension: "wlb",
    title: { zh: "我重视work life balance", en: "I value work-life balance" },
  },
  {
    id: "hobbies",
    type: "likert",
    dimension: "wlb",
    title: {
      zh: "我有很多兴趣爱好，想要多栖发展",
      en: "I have lots of hobbies and want to develop in multiple directions",
    },
  },
  {
    id: "family",
    type: "likert",
    dimension: "convenience",
    title: {
      zh: "我和原生家庭/父母的关系很好",
      en: "I have a good relationship with my family/parents",
    },
  },
  {
    id: "extrovert",
    type: "likert",
    dimension: "convenience",
    title: {
      zh: "我是超级E人！喜欢和朋友社交",
      en: "I'm a total extrovert who loves socializing!",
    },
  },
];

export const dimensionQuestionCounts: Record<Dimension, number> = {
  salary: 4,
  wlb: 2,
  difficulty: 2,
  convenience: 4,
  humanities: 4,
};

export const destinationWeights: Record<DestinationId, Record<Dimension, number>> = {
  US: { salary: 2, wlb: 0, difficulty: 2, convenience: 0, humanities: 1 },
  China: { salary: 1, wlb: -2, difficulty: -2, convenience: 2, humanities: -2 },
  UK: { salary: -1, wlb: -1, difficulty: 1, convenience: -2, humanities: 2 },
  SouthernEurope: { salary: -2, wlb: 2, difficulty: 1, convenience: -1, humanities: 2 },
  SingaporeHK: { salary: 2, wlb: 0, difficulty: 1, convenience: 1, humanities: -1 },
  MiddleEast: { salary: 2, wlb: 1, difficulty: 1, convenience: 0, humanities: -2 },
  Nomad: { salary: 1, wlb: 1, difficulty: 1, convenience: 0, humanities: 1 },
};

export const destinationOrder: DestinationId[] = [
  "US",
  "China",
  "UK",
  "SouthernEurope",
  "SingaporeHK",
  "MiddleEast",
  "Nomad",
];

export const resultCopy: Record<DestinationId, { title: { zh: string; en: string }; body: { zh: string; en: string } }> = {
  US: {
    title: { zh: "天选美区打工人！", en: "You're destined to work in the US!" },
    body: {
      zh: "你就是那种“要么卷死，要么卷赢”的狠人，高薪高压对你来说就是氧气。时差是你和家之间唯一的距离，但只要卡里数字跳得够快，这点乡愁根本不叫事儿。",
      en: "You're the “go hard or go home” type — high pay and high pressure are basically oxygen to you. The time difference is the only distance between you and home, but as long as your bank balance keeps climbing, a little homesickness is nothing.",
    },
  },
  China: {
    title: { zh: "天选中国打工人！", en: "You're destined to work in China!" },
    body: {
      zh: "楼下的麻辣烫、说走就走的地铁、爸妈的唠叨——这些看似普通的“方便”，才是你戒不掉的幸福感。你不是不能卷，只是卷也要卷在离家最近的地方。",
      en: "The mala tang shop downstairs, a subway you can hop on anytime, your parents' nagging — these ordinary “conveniences” are the happiness you can't quit. It's not that you can't grind, you just want to grind close to home.",
    },
  },
  UK: {
    title: { zh: "天选英区打工人！", en: "You're destined to work in the UK!" },
    body: {
      zh: "你嘴上说着“下个月就想回国”，身体却很诚实地泡在博物馆和老图书馆里舍不得走。工资打个折没关系，只要还能喝上一杯像样的红茶、蹭一场免费音乐会，精神就富足了。",
      en: "You keep saying you'll move home next month, but you're still happily stuck in museums and old libraries. A discounted paycheck is fine, as long as there's a proper cup of tea and a free concert to look forward to — that's enough to feel rich.",
    },
  },
  SouthernEurope: {
    title: { zh: "天选南欧打工人！", en: "You're destined to work in Southern Europe!" },
    body: {
      zh: "KPI？不存在的。你要的是晒着太阳发呆到下午四点，一杯咖啡能续到天黑，卡里余额不多但心情账户永远充值成功。",
      en: "KPIs? Never heard of them. You just want to sit in the sun until 4pm, make one coffee last until dark — your bank balance might be thin, but your mood account is always fully charged.",
    },
  },
  SingaporeHK: {
    title: { zh: "天选狮城/维港打工人！", en: "You're destined to work in Singapore/Hong Kong!" },
    body: {
      zh: "你是那种“既要又要还要”的六边形战士——薪水要高、离家要近、效率要拉满，一个都不能少。别人还在纠结鱼和熊掌，你已经在研究怎么两个一起吃。",
      en: "You're the “have it all” type — high pay, close to home, maximum efficiency, no compromises. While everyone else agonizes over choosing one thing, you're already figuring out how to have both.",
    },
  },
  MiddleEast: {
    title: { zh: "天选中东打工人！", en: "You're destined to work in the Middle East!" },
    body: {
      zh: "你已经进入“特种兵搞钱模式”，免税工资是你此生挚爱。攒够本金就闪现回国过好日子——先苦几年不寒碜。",
      en: "You've entered full “special-forces money mode” — tax-free pay is your one true love. Once you've saved enough, you'll teleport home to live the good life. A few hard years now is nothing to be ashamed of.",
    },
  },
  Nomad: {
    title: { zh: "天选游牧型打工人！", en: "You're a Nomad Worker!" },
    body: {
      zh: "你哪儿都能待，也哪儿都待不久——不是三心二意，是你活得比较“六边形均衡”，什么都想要一点，什么都不想被定死。别人还在纠结去哪儿，你已经在计划下一站了。",
      en: "You can live anywhere, and never for too long — not because you're indecisive, but because you're built for balance: you want a bit of everything and refuse to be pinned down. While everyone else is still debating where to go, you're already planning the next stop.",
    },
  },
};

export const TROPHY_IMAGE_SRC = "/trophy.png";
