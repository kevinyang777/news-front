import React, { Component } from "react";
import { getNews } from "../../utils/api";
import { Link } from 'react-router-dom'
import {Card, CardBody, CardHeader} from 'reactstrap'

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: []
    };
  }

  async componentDidMount() {
    const news = await getNews();
    this.setState({
      news
    });
  }

  render() {
    const { news: { data: { data = [] } = [] } = [] } = this.state;
    return (
      <div className="news-container">
        <div className="news-header">
          <h1>News Banner</h1>
        </div>
        <div className="news-container">
          {data.map(news => {
            return (
              <div className="news-tab">
              <Card>
              <CardHeader>
              {news.newsHeader}
              </CardHeader>
              <CardBody>
              {news.newsContent}
              </CardBody>
            </Card>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default News;
