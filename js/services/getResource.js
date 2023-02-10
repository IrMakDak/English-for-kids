const dbUrl = 'https://irmakdak.github.io/English-for-kids/cards.json';
function getUrl() {
  return dbUrl;
}

const getResource = async () => {
  const url = getUrl();
  const res = await fetch(url, {
    method: 'GET',
  });
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status ${res.status}`);
  } else {
    const result = await res.json();
    return result;
  }
};

export default getResource;
