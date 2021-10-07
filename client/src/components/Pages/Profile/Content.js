import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function Content({ ...props }) {
  return (
    <CardContent {...props}>
      <Typography variant="body2" color="text.secondary">
        This impressive paella is a perfect party dish and a fun meal to cook
        together with your guests. Add 1 cup of frozen peas along with the
        mussels, if you like.
      </Typography>
    </CardContent>
  );
}
