import axios from 'axios';
import fs from 'fs';
import path, { resolve } from 'path';

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

export const axiosImageDownload = async (url, folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const response = await axios({
    method: 'GET',
    url: url,
    responseType: 'stream',
  });

  const fileName = path.basename(url);
  const filePath = path.join(folderPath, fileName);

  const writer = fs.createWriteStream(filePath);
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', () => resolve(filePath));
    writer.on('error', (err) => reject(err));
  });
};
