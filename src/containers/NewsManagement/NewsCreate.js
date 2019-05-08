import React, { Component } from "react";
import { createNews, patchNews } from "../../utils/api";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  convertFromHTML,
  ContentState,
  compositeDecorator
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Input, Button } from "reactstrap";

class NewsManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      header: ""
    };
  }

  componentDidMount() {
    const {
      updateData: { newsHeader = "", newsContent = "" } = {}
    } = this.props;
    if (this.props.updateData !== undefined) {
      const state = convertFromRaw(JSON.parse(newsContent));
      this.setState({
        header: newsHeader,
        editorState: EditorState.createWithContent(state, compositeDecorator)
      });
    }
  }

  handleCreateNews = e => {
    e.preventDefault();
    const { header } = this.state;
    if (this.props.updateData === undefined) {
      createNews({
        newsHeader: header,
        newsContent: this.saveEditorToDB(),
        status: "published"
      })
        .then(res => (window.location.hash = "/newsmanagement"))
        .catch(err => console.log(err));
    } else {
      const { id = "", status = "" } = this.props.updateData;
      patchNews(id, {
        newsHeader: header,
        newsContent: this.saveEditorToDB(),
        status: status
      }).then(res => window.location.reload());
    }
  };

  onHeaderChange = e => {
    this.setState({
      header: e.target.value
    });
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
    this.saveEditorToDB();
  };

  saveEditorToDB = () => {
    const converted = convertToRaw(this.state.editorState.getCurrentContent());
    return JSON.stringify(converted);
  };

  render() {
    return (
      <div className="container">
        {this.props.updateData === undefined ? (
          <h1>Create News</h1>
        ) : (
          <h1>Update News</h1>
        )}
        <p>News Header</p>
        <Input
          onChange={e => this.onHeaderChange(e)}
          value={this.state.header}
        />
        <p>News Content</p>
        <Editor
          editorState={this.state.editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
        />
        <Button onClick={e => this.handleCreateNews(e)}>Save</Button>
      </div>
    );
  }
}

export default NewsManagement;
