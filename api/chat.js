export default async function handler(req, res) {
  const { messages } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
      }),
    });

    const data = await response.json();
    console.log("OpenAI response:", data); // 👈 ADD THIS LINE

    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn’t generate a response.";
    res.status(200).json({ reply });
  } catch (error) {
    console.error("Error contacting OpenAI:", error); // 👈 LOG ERROR
    res.status(500).json({ error: "Error contacting OpenAI" });
  
