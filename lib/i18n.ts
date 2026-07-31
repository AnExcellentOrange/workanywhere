import type { Locale } from "./types";

export const uiText = {
  zh: {
    siteTitle: "留英vs回国vs其他地方",
    siteSubtitle: "测一测哪里是你的打工圣地",
    likertLow: "完全不同意",
    likertHigh: "非常同意",
    startButton: "开始计算",
    progress: (answered: number, total: number) => `${answered}/${total} 已回答`,
    congrats: "恭喜恭喜！！！",
    shareButton: "分享给朋友",
    shareCopied: "文案已复制，快去分享吧！",
    shareText: (title: string) =>
      `【测出来了】我是${title}！你也来测测你的打工圣地在哪里 →`,
    retakeButton: "重新测一次",
    doesntMatter: "无所谓",
    majorLabel: "专业",
    majorPlaceholder: "请选择你的专业",
    salaryQuestion: "我对工资的期望是",
    loadingPhrases: [
      "正在计算……",
      "正在和宇宙沟通……",
      "正在用机器学习分析打工性价比……",
      "正在读取你的专业风水……",
      "正在测算你的卷王指数……",
    ],
  },
  en: {
    siteTitle: "Stay in the UK vs. Go Home vs. Somewhere Else",
    siteSubtitle: "Find Your Ideal Job Destination",
    likertLow: "Strongly Disagree",
    likertHigh: "Strongly Agree",
    startButton: "Start Calculating",
    progress: (answered: number, total: number) => `${answered}/${total} answered`,
    congrats: "Congrats!!!",
    shareButton: "Share with friends",
    shareCopied: "Copied! Go share it.",
    shareText: (title: string) =>
      `I just found out I'm destined for ${title}! Find your own job destination →`,
    retakeButton: "Retake the quiz",
    doesntMatter: "Doesn't matter",
    majorLabel: "What's your major?",
    majorPlaceholder: "Select your major",
    salaryQuestion: "My salary expectation is",
    loadingPhrases: [
      "Calculating...",
      "Consulting the cosmos...",
      "Running machine learning on your grind-to-reward ratio...",
      "Reading your major's feng shui...",
      "Measuring your grind-king index...",
    ],
  },
} as const;

export function t(locale: Locale) {
  return uiText[locale];
}
