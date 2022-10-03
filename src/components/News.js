import React, { Component } from 'react'
import Newsitem from './Newsitem'
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner'
import PropTypes from 'prop-types';


export default class News extends Component {

  articles = []

  static defaultProps = {
    pageSize: 1,
    country: "us",
    category: "science"
  }

  static propTypes = {
    pageSize: PropTypes.string,
    country: PropTypes.string,
    category: PropTypes.string
  }

  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: 0
    }

  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  async newsUpdate() {
    this.props.setProgress(10);
    this.setState({ loading: true });
    this.props.setProgress(30);
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&page=${this.state.page}&pageSize=${this.props.pageSize}&category=${this.props.category}&apiKey=${this.props.apiKey}`);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles, totalResults: parsedData.totalResults,
      loading: false
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    document.title = `News Monkey - ${this.capitalizeFirstLetter(this.props.category)}`;
    this.newsUpdate();
  }


  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    this.setState({ loading: true });
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}&category=${this.props.category}&apiKey=${this.props.apiKey}`);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false
    });
  };




  render() {

    return (

      <>
        <h2 className='text-center'>NewsMonkey - Top Headlines</h2>

        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <Newsitem title={element ? element.title : ""} description={element ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>

    )
  }
}
