const translate = async (text) => {
  console.log("Translating text: ", text);
  console.log("type", typeof text);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    text: text,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://codeshashtra-allstackers.onrender.com/translate",
      requestOptions
    );
    const result = await response.text();
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Translation failed");
  }
};

export default translate;
