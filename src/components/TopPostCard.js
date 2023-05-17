import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function TopPostCard({ post, goToPost }) {
  const handleCardClick = () => {
    goToPost(post);
  };

  return (
    <Card
      id={post.id}
      key={post.id}
      variant="outlined"
      onClick={handleCardClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography variant="button" gutterBottom>
            {post.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Upvotes: {post.upvotes}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

TopPostCard.propTypes = {
  goToPost: PropTypes.func.isRequired,
};
