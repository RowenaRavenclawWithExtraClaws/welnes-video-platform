import { Button } from "@mui/material";

const CustomButton = (props: {
  label: string;
  extraStyles: object;
  handler: () => void;
}) => {
  return (
    <Button
      className="custom-button"
      variant="contained"
      style={props.extraStyles}
      onClick={props.handler}
    >
      {props.label}
    </Button>
  );
};

export default CustomButton;
