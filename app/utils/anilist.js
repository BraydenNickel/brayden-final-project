const apiUrl = 'https://graphql.anilist.co';

export const fetchAniListData = async (query, variables) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors[0].message);
    }

    return data.data;
  } catch (error) {
    console.error('AniList API Error:', error.message);
    throw error;
  }
};
