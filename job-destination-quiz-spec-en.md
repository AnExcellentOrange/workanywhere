# Job Destination Quiz — Content & Scoring Spec (Final)

Note on language: the site needs a language switcher (中文 / English), like the one on the reference site worthjob.zippland.com. **Only one language is displayed at a time** — this file gives both zh and en text for every user-facing string so you can build a translation dictionary, not so both appear on screen together.

Site title:
- zh: 留英vs回国vs其他地方 - 测一测哪里是你的打工圣地
- en: Stay in the UK vs. Go Home vs. Somewhere Else — Find Your Ideal Job Destination

---

## 0. Scoring Logic

**5 scoring dimensions**: 薪资/Salary, wlb/Work-Life Balance, 难度/Difficulty & Mobility, 便利/Convenience, 人文/Humanities & Culture
**7 possible results**: US, China, UK, Southern Europe, Singapore/HK, Middle East, Nomad (游牧型打工人 — a deliberate "balanced across all dimensions" archetype, not a fallback)

### Calculation steps

1. Every answer adds/subtracts points to the dimension tagged on that question.
2. Each dimension's raw total is divided by the number of questions feeding it → a **normalized score** (roughly -2~+2), so dimensions with more questions don't dominate.
3. Multiply each normalized dimension score by the destination's weight for that dimension, sum across all 5:
   ```
   match_score(destination) = Σ (normalized_user_score[dim] × destination_weight[dim])
   ```
4. **Passport veto**: if the passport answer isn't "US", the "US" result is disqualified regardless of score.
5. Highest match score (among non-vetoed options) wins. If the top two are within ~0.3 of each other, default to Nomad. Tune this threshold after seeing real answer distributions.

### Question → dimension map (16 questions total)

| Dimension | Contributing questions | Count |
|---|---|---|
| Salary | Major, salary expectation, "I want to make money", "I'm very career-driven" | 4 |
| WLB | "I value work-life balance", "I have many hobbies and want a multi-faceted life" | 2 |
| Difficulty | Passport, "My English is excellent, I even speak a third language" | 2 |
| Convenience | "Convenience/shopping matters to me", "Good relationship with family", "I'm a big extrovert", "Prefer nature over CBD/malls" (reverse-scored) | 4 |
| Humanities | Gender, "Experience matters most", "Interested in humanities/arts/history/philosophy", "Love traveling" | 4 |

---

## 1. Destination Weight Table

| Dimension | US | China | UK | S. Europe | Singapore/HK | Middle East | Nomad |
|---|---|---|---|---|---|---|---|
| Salary | 2 | 1 | -1 | -2 | 2 | 2 | 1 |
| WLB | 0 | -2 | -1 | 2 | 0 | 1 | 1 |
| Difficulty | 2 | -2 | 1 | 1 | 1 | 1 | 1 |
| Convenience | 0 | 2 | -2 | -1 | 1 | 0 | 0 |
| Humanities | 1 | -2 | 2 | 2 | -1 | -2 | 1 |

---

## 2. Questions

Likert scale UI label pair (used on every 1-5 question): zh "完全不同意" / "非常同意" — en "Strongly Disagree" / "Strongly Agree". Internally 1-5 maps to -2~+2.

### Q1 — Gender 【Humanities】
- zh: 性别 | 女 (+1) / 男 (-1) / 其他 (+2)
- en: Gender | Female (+1) / Male (-1) / Other (+2)

### Q2 — Major 【Salary】 — dropdown, full list in Section 3
- zh: 专业
- en: What's your major?

### Q3 — Passport 【Difficulty】 — triggers the US veto rule (Section 0.4)
- zh: 护照 | 中国 (-1) / 英国 (+2) / 美国 (+2, only this avoids the veto) / 欧洲 (+2) / 其他 (0)
- en: Passport | China (-1) / UK (+2) / US (+2, only this avoids the veto) / Europe (+2) / Other (0)

### Q4 — Salary expectation 【Salary】 — needs the 3-way currency toggle, see Section 4
- zh: 我对工资的期望是 | >100k英镑 / 50k-100k英镑 / 30k-50k英镑 / 无所谓
- en: My salary expectation is | >100k GBP / 50k-100k GBP / 30k-50k GBP / Doesn't matter
- Scoring: >100k & 50k-100k tiers: Computer Science/Finance +2, all other majors -2. 30k-50k tier: Computer Science/Finance/Data/Economics +2, all other majors -2. "Doesn't matter": 0 for everyone.

### Q5 — English ability 【Difficulty】
- zh: 我的英文很好，甚至还会第三种语言！
- en: My English is excellent — I even speak a third language!

### Q6 — Experience 【Humanities】
- zh: 人生最重要的是体验
- en: Experience is the most important thing in life

### Q7 — Convenience 【Convenience】
- zh: 生活方便、购物方便对我来说很重要
- en: Convenience and easy shopping matter a lot to me

### Q8 — Money 【Salary】
- zh: 我想赚钱
- en: I want to make money

### Q9 — Career drive 【Salary】
- zh: 我的事业心很重！
- en: I'm very career-driven!

### Q10 — Humanities interest 【Humanities】
- zh: 我对人文艺术、历史、文学、哲学类感兴趣
- en: I'm interested in humanities, art, history, and philosophy

### Q11 — Travel 【Humanities】
- zh: 我喜欢旅游
- en: I love traveling

### Q12 — Nature vs. city 【Convenience — REVERSE SCORED】
- zh: 我喜欢自然风光多于城市CBD和shopping mall
- en: I prefer nature over city CBDs and shopping malls
- Scoring direction is flipped vs. every other Convenience question: option 1 (disagree) → +2, option 5 (agree) → -2.

### Q13 — Work-life balance 【WLB】
- zh: 我重视work life balance
- en: I value work-life balance

### Q14 — Multi-faceted hobbies 【WLB】
- zh: 我有很多兴趣爱好，想要多栖发展
- en: I have lots of hobbies and want to develop in multiple directions

### Q15 — Family relationship 【Convenience】
- zh: 我和原生家庭/父母的关系很好
- en: I have a good relationship with my family/parents

### Q16 — Extrovert 【Convenience】
- zh: 我是超级E人！喜欢和朋友社交
- en: I'm a total extrovert who loves socializing!

---

## 3. Major Dropdown 【Salary】 — CONFIRMED, do not change

| zh | en | Score |
|---|---|---|
| 计算机 | Computer Science | 2 |
| 数据 | Data Science | 1 |
| 金融 | Finance | 1 |
| 工程 | Engineering | 1 |
| 经济学 | Economics | 1 |
| 会计 | Accounting | 1 |
| 法律 | Law | 1 |
| 精算 | Actuarial Science | 2 |
| 管理学/MBA | Management/MBA | 1 |
| 房地产 | Real Estate | 1 |
| 物理/数学/统计 | Physics/Math/Statistics | 1 |
| 化学/材料 | Chemistry/Materials | 0 |
| 生物/医学预科 | Biology/Pre-Med | 0 |
| 公共政策/国际关系 | Public Policy/Int'l Relations | -1 |
| 心理学 | Psychology | -1 |
| 艺术 | Art | -2 |
| 建筑 | Architecture | -2 |
| 市场营销 | Marketing | -2 |
| 传媒/新闻传播 | Media/Journalism | -2 |
| 教育学 | Education | -2 |
| 语言/翻译 | Languages/Translation | -2 |
| 历史/哲学/社会学 | History/Philosophy/Sociology | -2 |
| 酒店与旅游管理 | Hospitality/Tourism Management | -2 |
| 时尚设计 | Fashion Design | -2 |

---

## 4. Currency Conversion Feature

The salary-expectation question is denominated in GBP but needs a **3-way toggle: GBP / CNY / USD** (segmented control) that switches the displayed values for all four tiers. Currency code labels (GBP/CNY/USD) can stay as-is in both languages — no need to translate the codes themselves.

- Demo/fallback rates (approximate market rate as of the date this spec was written): 1 GBP ≈ 9.05 CNY; 1 GBP ≈ 1.34 USD.
- For production, do NOT hardcode these permanently — fetch live rates from an exchange-rate API (client-side or a Next.js API route with light caching), falling back to the static rates above if the fetch fails.
- Converted values at these rates:

| Tier | GBP | CNY | USD |
|---|---|---|---|
| Top tier | >100k | >¥905,000 (~90.5万) | >$134,000 |
| Upper-mid | 50k-100k | ¥452,500-905,000 (~45.3万-90.5万) | $67,000-134,000 |
| Lower-mid | 30k-50k | ¥271,500-452,500 (~27.2万-45.3万) | $40,200-67,000 |
| Doesn't matter | — | — | — |

---

## 5. Result Copy (7 outcomes)

Keep the casual/colloquial tone in both languages — the en versions below are a natural rewrite of the same joke/tone, not a literal translation, so use them as-is rather than re-translating from scratch.

### US
- zh: **恭喜你！你是天选美区打工人！**
  你就是那种"要么卷死，要么卷赢"的狠人，高薪高压对你来说就是氧气。时差是你和家之间唯一的距离，但只要卡里数字跳得够快，这点乡愁根本不叫事儿。
- en: **Congrats! You're destined to work in the US!**
  You're the "go hard or go home" type — high pay and high pressure are basically oxygen to you. The time difference is the only distance between you and home, but as long as your bank balance keeps climbing, a little homesickness is nothing.

### China
- zh: **恭喜你！你是天选中国打工人！**
  楼下的麻辣烫、说走就走的地铁、爸妈的唠叨——这些看似普通的"方便"，才是你戒不掉的幸福感。你不是不能卷，只是卷也要卷在离家最近的地方。
- en: **Congrats! You're destined to work in China!**
  The mala tang shop downstairs, a subway you can hop on anytime, your parents' nagging — these ordinary "conveniences" are the happiness you can't quit. It's not that you can't grind, you just want to grind close to home.

### UK
- zh: **恭喜你！你是天选英区打工人！**
  你嘴上说着"下个月就想回国"，身体却很诚实地泡在博物馆和老图书馆里舍不得走。工资打个折没关系，只要还能喝上一杯像样的红茶、蹭一场免费音乐会，精神就富足了。
- en: **Congrats! You're destined to work in the UK!**
  You keep saying you'll move home next month, but you're still happily stuck in museums and old libraries. A discounted paycheck is fine, as long as there's a proper cup of tea and a free concert to look forward to — that's enough to feel rich.

### Southern Europe
- zh: **恭喜你！你是天选南欧打工人！**
  KPI？不存在的。你要的是晒着太阳发呆到下午四点，一杯咖啡能续到天黑，卡里余额不多但心情账户永远充值成功。
- en: **Congrats! You're destined to work in Southern Europe!**
  KPIs? Never heard of them. You just want to sit in the sun until 4pm, make one coffee last until dark — your bank balance might be thin, but your mood account is always fully charged.

### Singapore/HK
- zh: **恭喜你！你是天选狮城/维港打工人！**
  你是那种"既要又要还要"的六边形战士——薪水要高、离家要近、效率要拉满，一个都不能少。别人还在纠结鱼和熊掌，你已经在研究怎么两个一起吃。
- en: **Congrats! You're destined to work in Singapore/Hong Kong!**
  You're the "have it all" type — high pay, close to home, maximum efficiency, no compromises. While everyone else agonizes over choosing one thing, you're already figuring out how to have both.

### Middle East
- zh: **恭喜你！你是天选中东打工人！**
  你已经进入"特种兵搞钱模式"，免税工资是你此生挚爱。攒够本金就闪现回国过好日子——先苦几年不寒碜。
- en: **Congrats! You're destined to work in the Middle East!**
  You've entered full "special-forces money mode" — tax-free pay is your one true love. Once you've saved enough, you'll teleport home to live the good life. A few hard years now is nothing to be ashamed of.

### Nomad
- zh: **恭喜你！你是天选游牧型打工人！**
  你哪儿都能待，也哪儿都待不久——不是三心二意，是你活得比较"六边形均衡"，什么都想要一点，什么都不想被定死。别人还在纠结去哪儿，你已经在计划下一站了。
- en: **Congrats! You're a Nomad Worker!**
  You can live anywhere, and never for too long — not because you're indecisive, but because you're built for balance: you want a bit of everything and refuse to be pinned down. While everyone else is still debating where to go, you're already planning the next stop.
