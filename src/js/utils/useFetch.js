async function useFetch(url) {
  try {
    const result = await fetch(url);
    const datas = await result.json();
    return datas;
  } catch (err) {
    throw err;
  }
}

export { useFetch };
