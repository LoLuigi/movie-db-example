import { readCsvFile } from '../lib/csv.js';

class MoviesController {

  static async getAll(req, res) {
    const data = await readCsvFile('/data/movies.csv');
    const { size, page, id } = req.query;

    // return full data set if no batch size is provided
    if (!size && !page && !id) {
      console.log('MoviesController.getAll');
      res.json(data);
      return;
    };

    if(id) {
      const movie = data.find(item => item.Id === id);
      console.log(`MoviesController.getSingle`);
      res.json(movie);
      return;
    };

    // return batch of data if batch size is provided
    console.log('MoviesController.getBatch');
    const batchSize = parseInt(size, 10);
    const pageNumber = parseInt(page, 10);

    const start = batchSize * (pageNumber - 1);
    const end = start + batchSize;

    const batch = data.slice(start, end);

    res.json(batch);
    return;
  };

};

export default MoviesController;
