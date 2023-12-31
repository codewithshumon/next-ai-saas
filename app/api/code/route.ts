import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

import { incressApiLimit, checkApiLimit } from "@/lib/ApiLimit";
import { checkSubscription } from "@/lib/subscription";

//Open Initialization and setup
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

const instructionMessage: ChatCompletionMessageParam = {
  role: "system",
  content:
    "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.",
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorize", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Message are required", { status: 400 });
    }

    //fetching userApiLimit from prismadb
    const freeTrial = await checkApiLimit();

    //checking if the use has a Pro Plan activated
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has been expired", { status: 403 });
    }

    //Creating a chat completion
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });

    //updating userApiLimit count to prismadb
    //await incressApiLimit();

    //we won't increase ApiLimit data if user is in Pro plan
    if (!isPro) {
      await incressApiLimit();
    }

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
