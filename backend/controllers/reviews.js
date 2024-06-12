import { readCsvFile } from '../lib/csv.js';

class ReviewsController {
  static async getAll(req, res) {
    const data = await readCsvFile('/data/reviews.csv');

    // const { size, page } = req.query;
    const {id} = req.query;
    // console.log(id)
    // // return full data set if no batch size is provided
    if (!id) {
    console.log('ReviewsController.getAll');
    res.json(data);
    return;
    }
    const review = data.find(item => item.Id === id);
    console.log('ReviewsController.getSingle');
    // console.log(review)
    // return batch of data if batch size is provided
    res.json(review);
    return;
  }

}

export default ReviewsController;
