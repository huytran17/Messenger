import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

export default function CommonFormControl({ children, inputLabel, ...props }) {
  return (
    <FormControl
      variant="standard"
      color="success"
      sx={{ m: 1 }}
      fullWidth
      {...props}
    >
      <InputLabel>{inputLabel}</InputLabel>
      {children}
    </FormControl>
  );
}
