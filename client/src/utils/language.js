const getLanguage = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
  
    try {
      const response = await fetch(
        "https://codeshashtra-allstackers.onrender.com/language?mobile=9137357003",
        requestOptions
      );
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch language data");
    }
  };
  
export default getLanguage;  