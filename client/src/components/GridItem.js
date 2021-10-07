import Grid from "@mui/material/Grid";
import { ErrorHelperText } from "./index";
import { STRING } from "../constants/index";

export default function GridItem({ children, errorField, ...props }) {
  return (
    <Grid item xs={12} sm={6} {...props}>
      {children}
      {errorField ? (
        <ErrorHelperText error={errorField} sx={{ marginLeft: 1 }} />
      ) : (
        STRING.EMPTY
      )}
    </Grid>
  );
}
