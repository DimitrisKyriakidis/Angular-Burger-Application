import { Request, Response } from 'express';
import { BURGERS } from "./db-data";


export function editBurger(req: Request, res: Response) {

  console.log("Edit burger ...");
//   const id = req.params["id"];
//   const burger = BURGERS[id];

//   if (burger) {
//     burger.iconUrl = req.body.iconsUrl;
//     burger.description = req.body.description;
//     burger.category = req.body.category;
//   }
//   console.log(burger);
  

// //   const burger = BURGERS.update({id:req.params.id,
// //      iconUrl: req.body.imageUrl,
// //      description: req.body.description,
// //      category: req.body.category,
// //   });
//   setTimeout(() => {

//     res.status(200).json(burger);

//   }, 2000);
 
  const id = req.params["id"],
      burger = req.body;
      console.log('burger==',burger);
      

      BURGERS[id] = {
      ...BURGERS[id],
      ...burger
  };

  setTimeout(() => {

    res.status(200).json(BURGERS[id]);

  }, 1000);


}