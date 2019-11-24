const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Exercise = require('../../models/Exercise');

router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find();
    if (!exercises) {
      return res
        .status(401)
        .json({ errors: [{ msg: 'No exercises found!!' }] });
    }
    res.json(exercises);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
});

router.post(
  '/',
  [
    check('description', 'Please enter a description!')
      .not()
      .isEmpty(),
    check('duration', 'Please enter a duration')
      .not()
      .isEmpty(),
    check('intensity', 'Please enter an intensity level')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { description, duration, intensity } = req.body;

    try {
      // Count Number of documents to get index
      let index = await Exercise.countDocuments({}, (err, count) => {
        if (err) throw err;
        // console.log(`Number of documents: ${count}`);
      });

      //Get new index number
      index++;

      const exercise = new Exercise({
        index,
        description,
        duration,
        intensity
      });

      await exercise.save();

      res.json(exercise);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error!');
    }
  }
);

router.put('/:id', async (req, res) => {
  try {
    await Exercise.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      err => {
        if (err) throw err;
        res.json({ msg: 'Exercise updated' });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Exercise.findByIdAndDelete(req.params.id, err => {
      if (err) throw err;
      res.json({ msg: 'Exercise deleted' });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
});

module.exports = router;
