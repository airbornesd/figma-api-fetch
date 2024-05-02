import express from 'express';
import axios from 'axios';
import 'dotenv/config';
import { axiosGet, axiosImage } from './axios.js';
import { getIds } from './helpers.js';

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
    // const ids = getIds(data);

    // const images = await Promise.all(ids.map((key) => axiosImage(key)));

    return res.json({
      status: 200,
      message: 'success',
      data: data,
      error: null,
    });
  } catch (e) {
    console.error('error fetching data: ', e.message);
    return res.json({
      status: 500,
      message: 'error',
      data: null,
      error: e.message,
    });
  }
});

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
