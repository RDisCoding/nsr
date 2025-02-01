// app/api/parse-prescription/route.js

import { NextResponse } from 'next/server';

async function analyzeImageWithGPT4(base64Image) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze the following medical test report and provide a comprehensive breakdown that includes: \n1.Key Findings: Summarize the most significant results from the report.\n2.Interpretation in Simple Terms: Explain what these results indicate in layman's language, avoiding medical jargon.\n3.Concerning Values: Identify any values that are outside the normal range, highlighting their significance.\n4.General Health Implications: Discuss the overall health implications of the findings, again in layman's terms, including any potential concerns or recommendations for further action.\nInstructions: Ensure clarity and accessibility in your explanations, aiming for a tone that is informative yet easy to understand for someone without a medical background."
              },
              {
                type: "image_url",
                image_url: {
                  url: base64Image
                }
              }
            ]
          }
        ],
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API Error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw new Error('Failed to analyze prescription');
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image');

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${image.type};base64,${buffer.toString('base64')}`;

    const analysis = await analyzeImageWithGPT4(base64Image);

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process prescription' },
      { status: 500 }
    );
  }
}