import { NextResponse } from 'next/server';

// Helper endpoint to initialize the leaderboard in the correct format
export const POST = async () => {
  try {
    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;
    
    await fetch(`${url}/del/leaderboard`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log('Deleted existing key');
    
    const leaderboardData = [
      { id: 1, username: "Hero1", role: "human", score: 1500, date: "2026-03-02" },
      { id: 2, username: "Demon1", role: "monster", score: 1300, date: "2026-03-01" },
      { id: 3, username: "Player2", role: "human", score: 1100, date: "2026-02-28" },
    ];
    
    const jsonString = JSON.stringify(leaderboardData);
    
    // Set using REST API with proper format
    const setResponse = await fetch(`${url}/set/leaderboard/${encodeURIComponent(jsonString)}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const setResult = await setResponse.json();
    console.log('SET Response:', setResult);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Leaderboard initialized',
      data: leaderboardData 
    }, { status: 200 });
  } catch (error) {
    console.error('Init Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
