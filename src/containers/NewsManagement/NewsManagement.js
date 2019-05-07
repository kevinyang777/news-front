import React, { Component } from "react";
import { getNews } from "../../utils/api";
import { Table } from "reactstrap";

class NewsManagement extends Component {
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
      <div className="container">
        <h1>News List</h1>
        <Table responsive>
          <thead>
            <tr>
              <th>Header</th>
              <th>Content</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map(news => {
              return (
                <tr>
                  <td>{news.newsHeader}</td>
                  <td>{news.newsContent}</td>
                  <td>{news.status}</td>
                  <td>asd</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default NewsManagement;
