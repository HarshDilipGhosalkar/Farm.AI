// write and export a function that hits a api for the language data and sends it back to the component


export const getLanguage = () => {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };
      
    fetch("https://codeshashtra-allstackers.onrender.com/language?mobile=9137357003", requestOptions)
    .then((response) => response.json())
    .then((result) => {
        return result.data;
    })
    .catch((error) => console.error(error));
}
