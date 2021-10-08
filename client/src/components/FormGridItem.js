import Grid from "@mui/material/Grid";
import { ErrorHelperText } from "./index";
import { STRING } from "../constants/index";
import PropTypes from "prop-types";

export default function FormGridItem({
  children,
  errorField,
  errSx,
  ...props
}) {
  return (
    <Grid item xs={12} {...props}>
      {children}
      {errorField ? (
        <ErrorHelperText error={errorField} sx={errSx} />
      ) : (
        STRING.EMPTY
      )}
    </Grid>
  );
}

FormGridItem.propTypes = {
  children: PropTypes.node,
  errorField: PropTypes.string,
  errProps: PropTypes.object,
};
