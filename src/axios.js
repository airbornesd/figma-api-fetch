import axios from 'axios';
import fs from 'fs';
import { resolve } from 'path';

const token = process.env.FIGMA_ACCESS_TOKEN;

export const axiosGet = async (url) => {
  return await axios.get(url, {
    headers: {
      'X-FIGMA-TOKEN': token,
    },
  });
};

export const axiosImage = async (id) => {
  const url = `https://api.figma.com/v1/images/${process.env.FILE_KEY}/?ids=${id}&format=pdf`;

  const data = await axios.get(url, {
    headers: {
      'X-FIGMA-TOKEN': token,
    },
  });

  return data.data.images;
};

export const axiosImageDownload = async (url) => {
  const response = await axios.get(url, {
    responseType: 'stream',
  });
  // console.log('🚀 ~ axiosImageDownload ~ response:', response.data.pipe);

  const result = new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream('../testImg'))
      .on('finish', resolve)
      .on('error', reject)
      .once('close', () => resolve('../testImg'));
  });

  console.log(result);
};
