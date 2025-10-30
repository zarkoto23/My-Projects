import { Component } from "react";
import withAuth from "../../../../hoc/withAuth";

class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.deleteClickHandler = this.deleteClickHandler.bind(this);
  }

  async deleteClickHandler() {
    console.log("deleted");

    await this.props.auth.request.delete(
      `${import.meta.env.VITE_APP_SERVER_URL}/data/comments/${this.props._id}`,
      null,
      {
        headers: {
          "X-Admin": null,
        },
      }
    );

    this.props.onDelete(this.props._id);
  }

  componentWillUnmount() {
    console.log("component unmointed");
  }

  render() {
    return (
      <li>
        {this.props.comment}{" "}
        <button onClick={this.deleteClickHandler} style={{ color: "white" }}>
          X
        </button>
      </li>
    );
  }
}

const CommentItemWithAuth = withAuth(CommentItem);

export default CommentItemWithAuth;
