import express from 'express';
import 'dotenv/config';
import { axiosGet, axiosImage, axiosImageDownload } from './axios.js';
import { extractIds, sendResponse } from './helpers.js';

const app = express();
const port = process.env.PORT;
const node1 = process.env.NODE_ID_1;
const node2 = process.env.NODE_ID_2;
const url = `https://api.figma.com/v1/files/${process.env.FILE_KEY}/nodes?ids=${node1}`;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/', async (req, res) => {
  try {
    const response = await axiosGet(url);
    const data = response.data.nodes[node2].document.children[0].children;

    const ids = extractIds(data);

    const images = await Promise.all(ids.map((key) => axiosImage(key)));

    sendResponse(res, 200, 'success', images);
  } catch (e) {
    console.error('error fetching data: ', e.message);
    sendResponse(res, 400, 'error', null, e.message);
  }
});

axiosImageDownload(
  'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/ff364dfb-9b3b-4df6-a1ad-a04440fd8609'
);

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
