require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const token = process.env.TOKEN;

(async () => {
  const response = await fetch("https://api.github.com/user/repos?visibility=all&per_page=1000", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();

  for (let i = 0; i < data.length; i++) {
    const repo = data[i];
    const url = `https://api.github.com/repos/${repo.full_name}`;
    await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        private: false
      })
    });
    console.log(`${repo.name} has been made public.`);
  }
})();
