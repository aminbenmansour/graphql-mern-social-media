import { Card, Image, Icon, Label, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import moment from "moment";

const PostCard = (props) => {
  const { id, body, username, createdAt, likeCount, commentCount } = props.post;

  function likePost() {
    
  }

  function commentOnPost() {

  }

  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button as="div" labelPosition="right" style={{ marginRight: '.2rem' }} onClick={likePost}>
            <Button color="teal" basic>
              <Icon name="heart" />
            </Button>
            <Label basic size="mini" color="teal" pointing="left">
              {likeCount}
            </Label>
          </Button>
          <Button as="div" labelPosition="right" onClick={commentOnPost}>
            <Button color="blue" basic>
              <Icon name="comment" />
            </Button>
            <Label basic color="blue" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
