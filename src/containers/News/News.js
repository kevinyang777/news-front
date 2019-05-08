import React, { Component } from "react";
import { getNews } from "../../utils/api";
import { Link } from 'react-router-dom'
import {Card, CardBody, CardHeader} from 'reactstrap'
import { convertFromRaw } from "draft-js";
import {stateToHTML} from 'draft-js-export-html'; 

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
              <div dangerouslySetInnerHTML={{ __html: stateToHTML(convertFromRaw(JSON.parse(news.newsContent)))}}/> 
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
