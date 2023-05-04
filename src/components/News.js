import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner.js';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

    const [article, setArticle] = useState([])
    const [laoding, setLaoding] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitlizedString = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        let articleList = await fetch(url);
        props.setProgress(30);
        let partDate = await articleList.json();
        props.setProgress(70);

        setArticle(partDate.articles)
        setLaoding(false)
        setTotalResults(partDate.totalResults)
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = capitlizedString(props.category) + " - News Monkey"
        updateNews();
    }, [])
    

    // const handlePrevClick = async () => {
    //     setPage(page - 1)
    //     updateNews();
    // }

    // const handleNextClick = async () => {
    //     setPage(page + 1)
    //     updateNews();
    // }

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        setLaoding(true)
        let articleList = await fetch(url);
        let partDate = await articleList.json();
        
        setArticle(article.concat(partDate.articles))
        setTotalResults(partDate.totalResults)
    }

        return (
            <>
                <h2 className='text-center'>Newsmonkey - Top {capitlizedString(props.category)} Headlines</h2>
                {laoding && <Spinner />}

                <InfiniteScroll
                    dataLength={article.length}
                    next={fetchMoreData}
                    hasMore={article.length !== totalResults}
                    loader={<Spinner />}
                >

                    <div className="container my-3">
                        <div className="row">
                            {article.map((element, index) => {
                                return <div className="col-md-4" key={index}>
                                    <NewsItem title={element.title.slice(0, 72)} description={element.description !== null ? element.description.slice(0, 88) : ''} imageUrl={element.urlToImage}
                                        newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>

            </>
        )
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

};

export default News