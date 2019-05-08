import React, { Component } from "react";
import { getUsers, destoryUser, patchUser } from "../../utils/api";
import { Table, Button } from "reactstrap";

class NewsManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: []
    };
  }

  async componentDidMount() {
    const news = await getUsers();
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
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Deleted</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map(user => {
              return (
                <tr>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.deletedAt}</td>
                  <td>
                    <Button
                      onClick={e => {
                        e.preventDefault();
                        patchUser(user.id, {
                          id: user.id,
                          role: user.role === "user" ? "admin" : "user",
                          deletedAt: ""
                        }).then(res => window.location.reload());
                      }}
                    >
                      Update Role
                    </Button>
                    <Button
                      onClick={e => {
                        e.preventDefault();
                        destoryUser(user.id).then(res =>
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
    );
  }
}

export default NewsManagement;
