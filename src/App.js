import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './App.css';

const App = () => {
    const [articles, setArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [language, setLanguage] = useState('en');
    const [country, setCountry] = useState('us');
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const fetchNews = async (currentPage) => {
        try {
            const response = await axios.get(`http://localhost:5000/news`, {
                params: {
                    keyword: searchTerm,
                    language,
                    country,
                    page: currentPage + 1,
                }
            });
            setArticles(response.data.articles);
            setTotalPages(Math.ceil(response.data.totalArticles / 10));
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const handlePageClick = (data) => {
        setPage(data.selected);
        fetchNews(data.selected);
    };

    useEffect(() => {
        fetchNews(0);
    }, [searchTerm, language, country]);

    return (
        <div className="App">
            <h1>ACONEWS</h1>
            <input
                type="text"
                placeholder="Search for news"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select onChange={(e) => setLanguage(e.target.value)} value={language}>
                <option value="en">English</option>
                <option value="es">Spanish</option>
            </select>
            <select onChange={(e) => setCountry(e.target.value)} value={country}>
                <option value="us">United States</option>
                <option value="gb">United Kingdom</option>
            </select>

            <div className="news-articles">
                {articles.map((article, index) => (
                    <div key={index} className="article-card">
                        <h2>{article.title}</h2>
                        <p>{article.description}</p>
                        <a href={article.url} target="_blank" rel="noreferrer">Read more</a>
                    </div>
                ))}
            </div>

            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </div>
    );
};

export default App;

