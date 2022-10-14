import { Card, Image } from "semantic-ui-react";

import moment from "moment"

const PostCard = (props) => {
  const { body, username, createdAt } = props.post;

  console.log(props)
  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <p>Buttons here</p>
        </div>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
