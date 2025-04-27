import express from 'express';
import {
  getArticles,
  getArticleById,  // <-- import the new controller
  createArticle,
  updateArticle,
  deleteArticle,
  incrementViews,
  getTrendingArticles,
  getLatestArticles
} from '../controllers/articleController.mjs';
import { subscribe } from '../controllers/subscribeController.mjs';

const router = express.Router();

router.get('/articles', getArticles);
router.get('/articles/:id', getArticleById);
router.get('/trending', getTrendingArticles);
router.get('/latest', getLatestArticles);   
router.post('/articles', createArticle);
router.put('/articles/:id', updateArticle);
router.delete('/articles/:id', deleteArticle);
router.put('/articles/:id/views', incrementViews);


router.post('/subscribe', subscribe);

export default router;
