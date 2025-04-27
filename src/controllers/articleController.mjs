import Article from '../models/articleModel.mjs';
import Subscriber from '../models/subscriberModel.mjs';
import sendMail from './mailController.mjs';

// Helper function to get the first 10 words of the content
const getFirst10Words = (content) => {
  const words = content.split(' ');
  return words.slice(0, 10).join(' ') + (words.length > 10 ? '...' : '');
};

export const createArticle = async (req, res) => {
  const { title, thumbnailUrl, content, category } = req.body;

  try {
    // Create and save the new article
    const newArticle = new Article({ title, thumbnailUrl, content, category });
    await newArticle.save();

    // Fetch all subscribers from the database
    const subscribers = await Subscriber.find();

    // Loop through each subscriber and send an email
    for (const subscriber of subscribers) {
      let payload = {
        email: subscriber.email, // Email address of the subscriber
        title: newArticle.title, // Title of the new article
        content: getFirst10Words(newArticle.content), // First 10 words of the content
        id: newArticle._id // Article ID (optional, for a direct link to the article)
      };

      // Send the email using the sendMail function
      await sendMail({ type: 2, payload });
    }

    // Return the created article as a response
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get all articles
export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single article by ID (NEW)
export const getArticleById = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an article
export const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, thumbnailUrl, content, category } = req.body; // 👈 Added category

  try {
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    article.title = title || article.title;
    article.thumbnailUrl = thumbnailUrl || article.thumbnailUrl;
    article.content = content || article.content;
    article.category = category || article.category; // 👈 Update category

    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Delete an article
export const deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findByIdAndDelete(id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Increment views for a specific article
export const incrementViews = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the article by ID
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Increment the views by 1
    article.views += 1;
    await article.save();

    res.json({ message: 'View count updated', article });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get top 3 trending articles by views
export const getTrendingArticles = async (req, res) => {
  try {
    const trending = await Article.find().sort({ views: -1 }).limit(3);
    res.json(trending);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get latest 8 articles by createdAt
export const getLatestArticles = async (req, res) => {
  try {
    const latest = await Article.find().sort({ createdAt: -1 }).limit(8);
    res.json(latest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


