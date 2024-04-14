"use client";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { yearsDropdownOptions } from "../constant";

export const Graph = (): React.ReactElement => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [buttonText, setButtonText] = useState<string>("近5年");
  const open = Boolean(anchorEl);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>): void =>
    setAnchorEl(event.currentTarget);

  const closeMenu = (): void => setAnchorEl(null);
  
  return (
    <Box
      component="section"
      sx={{
        backgroundColor: "white",
        border: "1px solid #DFDFDF",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "20px 10px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained">每月營收</Button>
        <Button
          variant="contained"
          id="year-dropdown-button"
          aria-controls="dropdown-menu"
          aria-haspopup
          endIcon={<ExpandMoreIcon />}
          onClick={openMenu}
        >
          {buttonText}
        </Button>
        <Menu
          id="year-dropdown-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={closeMenu}
        >
          {yearsDropdownOptions.map((option) => (
            <MenuItem
              key={option.key}
              value={option.value}
              onClick={() => {
                closeMenu();
                setButtonText(option.key);
              }}
            >
              {option.key}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
};
