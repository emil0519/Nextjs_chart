import { Box } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface PropsType {
  title: string;
  contentList: string[];
}

export default function Information({ title, contentList }: PropsType) {
  return (
    <Box
      sx={{
        borderRadius: "4px",
        border: "1px solid #e9e9e9",
        boxSizing: "border-box",
        marginBottom: "20px",
        color: "#6A738C",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "10px 16px",
          fontSize: "13px",
          lineHeight: "20px",
          background: "#FFF",
          "& svg": {
            marginRight: "8px",
          },
        }}
      >
        <InfoOutlinedIcon />
        {title}
      </Box>
      <Box
        sx={{
          padding: "10px 40px 20px",
          fontSize: "13px",
          lineHeight: "20px",
          background: "white",
        }}
      >
        <Box
          component="ul"
          sx={{ listStyle: "disc", lineHeight: "35px", paddingLeft: "20px" }}
        >
          {contentList.map((content) => (
            <li key={content}>{content}</li>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
