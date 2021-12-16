import { Request, Response } from 'express';
import { BURGERS } from "./db-data";


export function saveCourse(req: Request, res: Response) {

  console.log("Saving burger ...");
  const burger = new BURGERS({
    iconUrl: req.body.imageUrl,
    description: req.body.description,
    category: req.body.category,
  });
  burger.save().then(
    () => {
      res.status(200).json({
        message: 'Burger saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
  // const id = req.params["id"],
  //     changes = req.body;

  //     BURGERS[id] = {
  //     ...BURGERS[id],
  //     ...changes
  // };

  // setTimeout(() => {

  //   res.status(200).json(BURGERS[id]);

  // }, 2000);

}

