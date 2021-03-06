export default async function fetcher(url) {
  const res = await fetch(url, {
    method: "GET",
    credentials: "same-origin",
  });

  return res.json();
}
