import { Box } from "@mui/material";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

// component for accordion expand/collapse icons
export default function CustomAccordionExpandIcon() {
    return (
        <Box
            sx={{
                ".Mui-expanded & > .collapsIconWrapper": {
                    display: "none",
                },
                ".expandIconWrapper": {
                    display: "none"
                },
                ".Mui-expanded & > .expandIconWrapper": {
                    display: "block"
                }
            }}
        >
            <div className="expandIconWrapper"><RemoveCircleOutlineIcon sx={{ color: 'darkBlue.main' }} /></div>
            <div className="collapsIconWrapper"><AddCircleOutlineIcon sx={{ color: 'darkBlue.main' }} /></div>
        </Box>
    );
};