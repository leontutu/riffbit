import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI();

console.log("Sending request to OpenAI...");

let timerStart = Date.now();

const response = await client.responses.create({
    model: "gpt-5-mini",
    input: "Stimmt es - so groß wie die Nase eines Mannes, so auch sein Johannes?",
});

let timerEnd = Date.now();

console.log(response.output_text);
console.log(`Request completed in ${timerEnd - timerStart} ms`);
