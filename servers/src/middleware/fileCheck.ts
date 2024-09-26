import { Request, Response, NextFunction } from 'express';

const checkMaxFileCount = (req: Request, res: Response, next: NextFunction) => {
  // Ensure req.files is an array before checking its length
  const files = req.files as Express.Multer.File[]; // Assert that req.files is an array of files

  // Check if files are present and count them
  if (files && files.length > 2) {
    return res.status(400).json({ message: "You cannot upload more than two files." });
  }

  // If validation passes, proceed to the next middleware
  next();
};

export default checkMaxFileCount;
