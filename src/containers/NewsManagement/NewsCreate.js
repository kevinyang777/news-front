import React, { Component } from "react";
import { createNews } from "../../utils/api";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
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

  handleCreateNews = e => {
    e.preventDefault();
    const { header } = this.state;
    createNews({
      newsHeader: header,
      newsContent: this.saveEditorToDB(),
      status: "published"
    }).then(res=>console.log(res)
    ).catch(err=>console.log(err))
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
    const blocks = convertToRaw(this.state.editorState.getCurrentContent()).blocks;
    const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    return value
  };

  render() {
    return (
      <div className="container">
        <h1>Create News</h1>
        <p>News Header</p>
        <Input onChange={e => this.onHeaderChange(e)} />
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
