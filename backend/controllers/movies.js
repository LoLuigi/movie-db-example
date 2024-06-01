import { readCsvFile } from '../lib/csv.js';

class MoviesController {

  static async getAll(req, res) {
    console.log('MoviesController.getAll');
    const data = await readCsvFile('/data/movies.csv');

    const { size, page } = req.query;

    // return full data set if no batch size is provided
    if (!size && !page) {
      res.json(data);
      return;
    }

    // return batch of data if batch size is provided
    const batchSize = parseInt(size, 10);
    const pageNumber = parseInt(page, 10);

    const start = batchSize * (pageNumber - 1);
    const end = start + batchSize;

    const batch = data.slice(start, end);

    res.json(batch);
    return;
  }

}

export default MoviesController;
