import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { selectData, selectIsLoading } from "../../../app/slices/userSlice";
import Skeleton from "@mui/material/Skeleton";

export default function Content({ ...props }) {
  const user = useSelector(selectData);

  const isLoading = useSelector(selectIsLoading);

  return isLoading ? (
    <Skeleton variant="text" width="96%" height={80} />
  ) : (
    <CardContent {...props}>
      <Typography variant="body2" color="text.secondary">
        {user.quote}
      </Typography>
    </CardContent>
  );
}
