import "./MarketNews.css";

export default function MarketNews({ articles }) {
  if (!articles || articles.length === 0) {
    return <p>No news available</p>;
  }

  return (articles && articles.length) !== 0 ? (
    <div className="market-news">
      {articles.map((article, index) => (
        <article key={index} className="news-article">
          <h3>{article.title}</h3>
          <p>{article.description || article.content}</p>
          {article.url && (
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          )}
        </article>
      ))}
    </div>
  ) : (
    <p>No news available</p>
  );
}
