import { NextResponse } from 'next/server';

export const OPTIONS = async () => {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
};

// Endpoint to add a new player to the leaderboard
export const POST = async (request) => {
  try {
    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;
    
    // Parse request body for new player data
    const body = await request.json();
    const { username, role, score, date } = body;
    
    // Validate required fields
    if (!username || !role || score === undefined || !date) {
      return NextResponse.json({ 
        error: 'Missing required fields: username, role, score, date' 
      }, { status: 400 });
    }
    
    // Fetch existing leaderboard
    const getResponse = await fetch(`${url}/get/leaderboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const getData = await getResponse.json();
    
    // Parse existing data
    let leaderboardData = [];
    if (getData.result) {
      try {
        leaderboardData = JSON.parse(getData.result);
      } catch (e) {
        leaderboardData = Array.isArray(getData.result) ? getData.result : [];
      }
    }
    
    // Generate next ID
    const nextId = leaderboardData.length > 0 
      ? Math.max(...leaderboardData.map(p => p.id || 0)) + 1 
      : 1;
    
    // Create new player object
    const newPlayer = { id: nextId, username, role, score, date };
    leaderboardData.push(newPlayer);
    
    const jsonString = JSON.stringify(leaderboardData);
    
    // Set using REST API with proper format
    const setResponse = await fetch(`${url}/set/leaderboard/${encodeURIComponent(jsonString)}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const setResult = await setResponse.json();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Player added to leaderboard',
      player: newPlayer 
    }, { status: 201 });
  } catch (error) {
    console.error('Init Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
