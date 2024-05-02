import axios from 'axios';

const token = process.env.FIGMA_ACCESS_TOKEN;

export const axiosGet = async (url) => {
  return await axios.get(url, {
    headers: {
      'X-FIGMA-TOKEN': token,
    },
  });
};

export const axiosImage = async (id) => {
  const url = `https://api.figma.com/v1/images/${process.env.FILE_KEY}/?ids=${id}&format=png`;

  const data = await axios.get(url, {
    headers: {
      'X-FIGMA-TOKEN': token,
    },
  });

  return data.data.images;
};
