import Grid from "@mui/material/Grid";
import { ErrorHelperText } from "./index";
import { STRING } from "../constants/index";

export default function FormGridItem({ children, errorField, ...props }) {
  return (
    <Grid item xs={12} {...props}>
      {children}
      {errorField ? <ErrorHelperText error={errorField} /> : STRING.EMPTY}
    </Grid>
  );
}
