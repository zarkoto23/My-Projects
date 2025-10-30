import { Component } from "react";
import request from "../../../utils/request";
import CommentItem from "./comment-item/CommentItem";

const commentsUrl = `${import.meta.env.VITE_APP_SERVER_URL}/data/comments`

export default class AdminComments extends Component {
  constructor(props) {
    console.log('initialization component');
    
    super(props);

    this.state = {
      comments: [],
    };
  }

  async componentDidMount() {
    console.log('comp mount');
    
    const comments = await request.get(commentsUrl);
    this.setState({ comments });
  }
  
  deleteCommentsHandler(commentId){
    console.log('delete', commentId);

    this.setState({
        comments:this.state.comments.filter(coment=>coment._id!==commentId)
    })
    

  }


  componentDidUpdate(){

        console.log('update component');
        
  }

  render() {

    // if(Math.random()<0.5){
    //     throw new Error('FAIL')
    // }
    return (
      <ul style={{ color: "white" }}>
        {this.state.comments.map((com) => (
          <CommentItem key={com._id} 
          comment={com.comment} 
          _id={com._id}
          onDelete={this.deleteCommentsHandler.bind(this)}
          
          />
        ))}
      </ul>
    );
  }
}
