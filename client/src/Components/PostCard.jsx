import { Card, Image, Icon, Label, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import moment from "moment";

const PostCard = (props) => {
  const { id, body, username, createdAt, likeCount } = props.post;

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
          <Button as="div" labelPosition="right">
            <Button color="teal" basic>
              <Icon name="heart" />
              Like
            </Button>
            <Label basic color="teal" pointing="left">
              {likeCount}
            </Label>
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
