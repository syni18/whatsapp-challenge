import React from 'react'
import PropTypes from 'prop-types'
import {EmojiPickerContainer, EmojiContainer} from './EmojisStyle'

const Emoji = ({pickEmoji}) => {
    return (
        <EmojiContainer>
            {
            <EmojiPickerContainer 
                onEmojiClick={pickEmoji}
                disableSearchBar={true}
                />
            }
        </EmojiContainer>
    );
}

Emoji.propTypes = {
    pickEmoji: PropTypes.func
};

export default Emoji;