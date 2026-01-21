import { useState } from "react";
import "./MarketNews.css";

export default function MarketNews({ articles }) {
  const [expandedArticles, setExpandedArticles] = useState(new Set());

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const toggleArticle = (index) => {
    const newExpanded = new Set(expandedArticles);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedArticles(newExpanded);
  };

  return (articles && articles.length) !== 0 ? (
    <div className="market-news">
      {articles.map((article, index) => {
        const text = article.description || article.content || '';
        const isExpanded = expandedArticles.has(index);
        const needsTruncation = text.length > 150;

        return (
          <article key={index} className="news-article">
            <h3>{article.title}</h3>
            {article.published_at && (
              <span className="news-date">{formatDate(article.published_at)}</span>
            )}
            <p>
              {isExpanded ? text : truncateText(text)}
              {needsTruncation && (
                <button 
                  className="read-more-btn" 
                  onClick={() => toggleArticle(index)}
                >
                  {isExpanded ? ' Read less' : ' Read more'}
                </button>
              )}
            </p>
            {article.url && (
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                View source
              </a>
            )}
          </article>
        );
      })}
    </div>
  ) : (
    <p>Loading news...</p>
  );
}
