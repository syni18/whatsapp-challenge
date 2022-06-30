import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";

export const EmojiContainer = styled.div
    `width: max-content;
    display: flex;
    position: sticky;
    max-height: 100%;
    overflow-y: auto;
    background-color: #fff;
    `
;

export const EmojiPickerContainer = styled(EmojiPicker)`
`;