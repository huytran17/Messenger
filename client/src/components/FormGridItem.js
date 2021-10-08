import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import { ErrorHelperText } from "./index";

export default function FormGridItem({
  children,
  errorField,
  errSx,
  ...props
}) {
  return (
    <Grid item xs={12} {...props}>
      {children}
      {errorField && <ErrorHelperText error={errorField} sx={errSx} />}
    </Grid>
  );
}

FormGridItem.propTypes = {
  children: PropTypes.node,
  errorField: PropTypes.string,
  errProps: PropTypes.object,
};
