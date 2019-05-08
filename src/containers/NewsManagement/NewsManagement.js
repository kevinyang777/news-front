import React, { Component } from "react";
import { getNews, destroyNews, patchNews } from "../../utils/api";
import { Table, Button } from "reactstrap";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import NewsCreate from "./NewsCreate";

class NewsManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      window: "news",
      selectedNews: []
    };
  }

  async componentDidMount() {
    const news = await getNews();
    this.setState({
      news
    });
  }

  changeUpdateWindow = (e, news) => {
    e.preventDefault();
    this.setState({
      window: this.state.news === "news" ? "news" : "update",
      selectedNews: news !== [] ? news : []
    });
  };

  render() {
    const { news: { data: { data = [] } = [] } = [] } = this.state;
    return (
      <div className="container">
        {this.state.window === "news" ? (
          <div>
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
                      <td>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: stateToHTML(
                              convertFromRaw(JSON.parse(news.newsContent))
                            )
                          }}
                        />
                      </td>
                      <td>{news.status}</td>
                      <td>
                        <Button
                          onClick={e => {
                            e.preventDefault();
                            patchNews(news.id, {
                              newsHeader: news.newsHeader,
                              newsContent: news.newsContent,
                              status:
                                news.status === "published"
                                  ? "unpublish"
                                  : "published"
                            }).then(res => window.location.reload());
                          }}
                        >
                          {news.status === "published"
                            ? "unpublish"
                            : "published"}
                        </Button>
                        <br />
                        <br />
                        <Button onClick={e => this.changeUpdateWindow(e, news)}>
                          Update
                        </Button>
                        <br />
                        <br />
                        <Button
                          onClick={e => {
                            e.preventDefault();
                            destroyNews(news.id).then(res =>
                              window.location.reload()
                            );
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        ) : (
          <NewsCreate updateData={this.state.selectedNews} />
        )}
      </div>
    );
  }
}

export default NewsManagement;
