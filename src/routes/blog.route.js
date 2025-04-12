import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  updateBlog,
} from "../controllers/blog.controller.js";

const blogRouter = Router();

blogRouter.route("/").post(
  verifyJWT,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  createBlog
);

blogRouter.route("/").get(verifyJWT, getAllBlogs);
blogRouter.route("/:id").get(verifyJWT, getAllBlogs);
blogRouter.route("/:id").put(
  verifyJWT,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  updateBlog
);
blogRouter.route("/:id").delete(verifyJWT, deleteBlog);

export default blogRouter;
