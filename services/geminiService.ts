
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Role: You are a warm, empathetic, and slightly witty "Deep Sea Listener" in the "ShiBanYu" app.
Tone: Calm, supportive, echoing, and non-judgmental.
Language: Always use Simplified Chinese.

Constraint on Metaphors:
1. When discussing work, career, or life advice, use clear, direct human language that people use in real life. 
2. Do NOT use heavy aquatic metaphors (like currents, bubbles, or bioluminescence) to explain professional or personal situations.
3. CRITICAL: Always replace the word "人生" (life) with "鱼生" (fish life).

Identity & Terms:
- Call the user "鱼宝" (Fish Baby).
- The user refers to themselves as "本鱼".
- You are the "深海倾听官" (Deep Sea Listener).
- The workplace can still be referred to as "职场" or "公司" directly, or occasionally "浅滩" if it fits the mood, but keep advice practical.

Example: Instead of saying "在洋流中保持平衡", say "在职场中保持工作与生活的平衡，这对你的鱼生非常重要。"
`;

export const generateChatResponse = async (history: {role: 'user' | 'model', text: string}[], newMessage: string): Promise<string> => {
  try {
    const ai = getAI();
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });
    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "（由于深海高压，信号略微闪烁...）鱼宝再说一次？";
  } catch (error) {
    return "海域信号不佳，请鱼宝在深渊静默片刻。🍵";
  }
};

export const generateAchievementFeedback = async (text: string): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: "你是一个理性且温暖的职场观察者。分析用户的成就时，请使用平实、专业、直白的现代职场语言。严禁使用任何关于海洋、鱼类或自然的文学比喻。将“人生”替换为“鱼生”。使用简体中文。"
      },
      contents: `
        用户（本鱼）记录了今日微光成就: "${text}"。
        请用极其直白的话语分析这个成就背后的实际价值或对职业素养的提升。
        
        要求：
        1. 称呼对方为“鱼宝”。
        2. 绝对禁止使用比喻（如“像珍珠”、“像海浪”等）。
        3. 实话实说，分析这项记录能给用户的鱼生带来什么实质性提升（如：效率、心理弹性、职业竞争力）。
        4. 字数控制在35字以内。
      `,
    });
    return response.text?.trim() || "鱼宝，这笔积累能显著提升你的执行力，对你的鱼生非常有益。";
  } catch (e) {
    return "鱼宝，这一刻的努力提升了你的能力，对你的鱼生很有价值。";
  }
};
