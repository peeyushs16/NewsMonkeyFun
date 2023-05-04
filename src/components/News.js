import React, { Component } from 'react'
import NewsItem from './NewsItem'
import { Spinner } from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    };

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string

    };

    constructor() {
        super();

        this.state = {
            article: [],
            laoding: true,
            page: 1
        }
    }

    capitlizedString = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async updateNews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let articleList = await fetch(url);
        this.props.setProgress(30);
        let partDate = await articleList.json();
        this.props.setProgress(70);
        this.setState({
            article: partDate.articles,
            laoding: false,
            page: this.state.page - 1
        });
        this.props.setProgress(100);
        document.title = this.capitlizedString(this.props.category) + " - News Monkey"
    }

    async componentDidMount() {


        console.log('apikey',this.props.apikey);
        this.updateNews();
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }

    fetchMoreData = async () => {
        // console.log('fetch more call');
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ laoding: true });
        let articleList = await fetch(url);
        let partDate = await articleList.json();
        this.setState({
            article: this.state.article.concat(partDate.articles),
            totalResults: partDate.totalResults
        });
    }

    render() {
        return (
            <>
                <h2 className='text-center'>Newsmonkey - Top {this.capitlizedString(this.props.category)} Headlines</h2>
                {this.laoding && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.article.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.article.length !== this.state.totalResults}
                    loader={<Spinner />}
                >

                    <div className="container my-3">
                        <div className="row">
                            {this.state.article.map((element, index) => {
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
}

export default News