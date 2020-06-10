const axios = require('axios');
const utils = require('../utils');



module.exports = {

  getAnimals : async (req, res) => {

    const animalUrl = req.params.animal;
    const count = req.query.count;
    const urls = req.query.urls;
    let protocol = req.query.protocol;

    protocol === 'https' ? protocol = true : protocol = false;

    let jsonResponse = {
      type: 'success',
      code: 200,
      total: count,
      data: {
        animals: {}
      }
    }

    try {

      if (animalUrl === 'animals'){
        let allAnimals = true;
        let animalType = ['shibes', 'cats', 'birds'];
        let tab = [];

        for (const element of animalType){
          const url = `http://shibe.online/api/${element}?count=${count}&urls=${urls}&httpsUrls=${protocol}`;

          tab.push(await animalCall(url, element, count, allAnimals, urls));
        }
        tab = tab.flat();
        jsonResponse.data.animals = tab;
        res.json(jsonResponse);

      } else if (animalUrl === 'shibes' || animalUrl === 'cats' || animalUrl === 'birds'){
        const url = `http://shibe.online/api/${animalUrl}?count=${count}&urls=${urls}&httpsUrls=${protocol}`;

        jsonResponse.data.animals = await animalCall(url, animalUrl, count);
        renameKey(jsonResponse.data, animalUrl, 'animals');
        res.json(jsonResponse);

      } else {
        res.status(400).send('Bad request')
      }

    } catch (e) {
      console.log('error: ', e);
    }
  }
}



async function animalCall(url, animal, count, allAnimals, urls){
  const response = await axios.get(url);
  const data = response.data;

  if (typeof allAnimals !== 'undefined'){
    let animalData = {
      type: animal,
      id: data
    };

    if (urls === 'true'){
      renameKey(animalData, 'url', 'id')
    }
    return animalData;

  } else {
    return data;
  }
}



function renameKey(obj, newKey, oldKey){

  Object.defineProperty(obj, newKey, Object.getOwnPropertyDescriptor(obj, oldKey));
  delete obj[oldKey];

  return (obj)
}
