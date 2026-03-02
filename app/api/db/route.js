import { NextResponse } from 'next/server';

export const POST = async () => {
  try {
    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;
    
    // Get leaderboard (stored as JSON string)
    const response = await fetch(`${url}/get/leaderboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    
    // Parse the JSON string
    let result = null;
    if (data.result) {
      try {
        result = JSON.parse(data.result);
      } catch (e) {
        result = data.result;
      }
    }

    const asArray = Array.isArray(result)
      ? result
      : result && typeof result === 'object'
        ? Object.values(result)
        : [];

    const top5 = asArray
      .filter((player) => player && typeof player === 'object')
      .map((player) => ({
        id: player.id,
        username: player.username,
        role: player.role,
        score: Number(player.score ?? 0),
        date: player.date,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 25);
    
    return NextResponse.json({ result: top5 }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};