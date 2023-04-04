import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const FlexBox = styled(Box)({
  display: 'flex',
});

const CenteredFlexBox = styled(FlexBox)({
  justifyContent: 'center',
  alignItems: 'center',
});

const FullSizeCenteredFlexBox = styled(CenteredFlexBox)({
  width: '100%',
  height: '100%',
});

const BottomBox = styled(Box)({
  position: 'fixed',
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1030
});


export { FlexBox, CenteredFlexBox, FullSizeCenteredFlexBox, BottomBox };
